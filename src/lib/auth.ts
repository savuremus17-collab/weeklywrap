import { supabase } from '@/lib/supabase/client'
import type { SignInWithPasswordCredentials, SignUpWithPasswordCredentials } from '@supabase/supabase-js'

export type AuthError = {
  message: string
  code?: string
}

export async function signInWithEmail(email: string, password: string) {
  const credentials: SignInWithPasswordCredentials = { email, password }
  const { data, error } = await supabase.auth.signInWithPassword(credentials)
  if (error) {
    return { data: null as null, error: { message: error.message, code: error.status?.toString() } as AuthError }
  }
  return { data, error: null as null }
}

export async function signUpWithEmail(email: string, password: string, metadata?: Record<string, string>) {
  const credentials: SignUpWithPasswordCredentials = {
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      data: metadata,
    },
  }
  const { data, error } = await supabase.auth.signUp(credentials)
  if (error) {
    return { data: null as null, error: { message: error.message, code: error.status?.toString() } as AuthError }
  }
  return { data, error: null as null }
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      queryParams: { access_type: 'offline', prompt: 'consent' },
    },
  })
  if (error) {
    return { data: null as null, error: { message: error.message } as AuthError }
  }
  return { data, error: null as null }
}

export async function sendMagicLink(email: string) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback` },
  })
  if (error) {
    return { data: null as null, error: { message: error.message } as AuthError }
  }
  return { data, error: null as null }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    return { error: { message: error.message } as AuthError }
  }
  return { error: null as null }
}

export async function sendPasswordResetEmail(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?type=recovery`,
  })
  if (error) {
    return { data: null as null, error: { message: error.message } as AuthError }
  }
  return { data, error: null as null }
}

export async function updatePassword(password: string) {
  const { data, error } = await supabase.auth.updateUser({ password })
  if (error) {
    return { data: null as null, error: { message: error.message } as AuthError }
  }
  return { data, error: null as null }
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession()
  if (error) {
    return { session: null as null, error: { message: error.message } as AuthError }
  }
  return { session: data.session, error: null as null }
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser()
  if (error) {
    return { user: null as null, error: { message: error.message } as AuthError }
  }
  return { user: data.user, error: null as null }
}