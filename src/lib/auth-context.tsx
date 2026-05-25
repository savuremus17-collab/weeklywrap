'use client'

import { createContext, useCallback, useEffect, useRef, useState } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'
import {
  signInWithEmail as signInEmail,
  signUpWithEmail as signUpEmail,
  signInWithGoogle,
  sendMagicLink,
  signOut as signOutUser,
  sendPasswordResetEmail,
  updatePassword,
  type AuthError,
} from '@/lib/auth'

export type AuthContextType = {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signUp: (email: string, password: string, name?: string) => Promise<{ error: AuthError | null }>
  signInWithGoogle: () => Promise<{ error: AuthError | null }>
  sendMagicLink: (email: string) => Promise<{ error: AuthError | null }>
  signOut: () => Promise<void>
  sendPasswordResetEmail: (email: string) => Promise<{ error: AuthError | null }>
  updatePassword: (password: string) => Promise<{ error: AuthError | null }>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const initializedRef = useRef(false)

  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true

    const initialize = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession()
        if (currentSession) {
          setSession(currentSession)
          setUser(currentSession.user)
        }
      } catch (err) {
        console.error('Error initializing auth:', err)
      } finally {
        setLoading(false)
      }
    }

    initialize()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: string, newSession: Session | null) => {
      setSession(newSession)
      setUser(newSession?.user ?? null)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true)
    const { error } = await signInEmail(email, password)
    setLoading(false)
    return { error }
  }, [])

  const signUp = useCallback(async (email: string, password: string, name?: string) => {
    setLoading(true)
    const { error } = await signUpEmail(email, password, name ? { full_name: name } : undefined)
    setLoading(false)
    return { error }
  }, [])

  const handleSignInWithGoogle = useCallback(async () => {
    const { error } = await signInWithGoogle()
    return { error }
  }, [])

  const handleSendMagicLink = useCallback(async (email: string) => {
    const { error } = await sendMagicLink(email)
    return { error }
  }, [])

  const handleSignOut = useCallback(async () => {
    await signOutUser()
    setUser(null)
    setSession(null)
  }, [])

  const handleSendPasswordResetEmail = useCallback(async (email: string) => {
    const { error } = await sendPasswordResetEmail(email)
    return { error }
  }, [])

  const handleUpdatePassword = useCallback(async (password: string) => {
    const { error } = await updatePassword(password)
    return { error }
  }, [])

  const value: AuthContextType = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signInWithGoogle: handleSignInWithGoogle,
    sendMagicLink: handleSendMagicLink,
    signOut: handleSignOut,
    sendPasswordResetEmail: handleSendPasswordResetEmail,
    updatePassword: handleUpdatePassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}