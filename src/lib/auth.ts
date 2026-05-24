import { createClient } from '@/lib/supabase/client'
import type { SignInWithPasswordCredentials, SignUpWithPasswordCredentials } from '@supabase/supabase-js'

/**
 * Auth utility functions for the WeeklyWrap app.
 * These are designed to be used in client components via the useAuth hook.
 */

export type AuthError = {
  message: string
  code?: string
}

/**
 * Sign in with email and password
 */
export async function signInWithEmail(
  email: string,
  password: string,
  rememberMe = false
) {
  const supabase = createClient()

  const credentials: SignInWithPasswordCredentials = {
    email,
    password,
  }

  const { data, error } = await supabase.auth.signInWithPassword(credentials)

  if (error) {
    return { data: null, error: { message: error.message, code: error.status?.toString() } }
  }

  return { data, error: null }
}

/**
 * Sign up with email and password
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  metadata?: Record<string, string>
) {
  const supabase = createClient()

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
    return { data: null, error: { message: error.message, code: error.status?.toString() } }
  }

  return { data, error: null }
}

/**
 * Sign in with Google OAuth
 */
export async function signInWithGoogle() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })

  if (error) {
    return { data: null, error: { message: error.message } }
  }

  return { data, error: null }
}

/**
 * Send magic link email
 */
export async function sendMagicLink(email: string) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  })

  if (error) {
    return { data: null, error: { message: error.message } }
  }

  return { data, error: null }
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    return { error: { message: error.message } }
  }

  return { error: null }
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(email: string) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?type=recovery`,
  })

  if (error) {
    return { data: null, error: { message: error.message } }
  }

  return { data, error: null }
}

/**
 * Update user password
 */
export async function updatePassword(password: string) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    return { data: null, error: { message: error.message } }
  }

  return { data, error: null }
}

/**
 * Get the current session
 */
export async function getSession() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getSession()

  if (error) {
    return { session: null, error: { message: error.message } }
  }

  return { session: data.session, error: null }
}

/**
 * Get the current user
 */
export async function getCurrentUser() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error) {
    return { user: null, error: { message: error.message } }
  }

  return { user: data.user, error: null }
}
