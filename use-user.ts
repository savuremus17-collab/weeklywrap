'use client'

import { useContext } from 'react'
import { AuthContext, type AuthContextType } from '@/lib/auth-context'

export function useUser() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useUser must be used within an AuthProvider')
  }

  return {
    user: context.user,
    session: context.session,
    loading: context.loading,
  }
}