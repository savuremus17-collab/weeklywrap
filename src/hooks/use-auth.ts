'use client'

import { useContext } from 'react'
import { AuthContext, type AuthContextType } from '@/lib/auth-context'

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  const {
    signIn,
    signUp,
    signInWithGoogle,
    sendMagicLink,
    signOut,
    sendPasswordResetEmail,
    updatePassword,
  } = context

  return {
    signIn,
    signUp,
    signInWithGoogle,
    sendMagicLink,
    signOut,
    sendPasswordResetEmail,
    updatePassword,
  }
}