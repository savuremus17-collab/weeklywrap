import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip auth callback
  if (pathname.startsWith('/auth/')) {
    return NextResponse.next()
  }

  const hasSession = request.cookies.getAll().some(c => 
    c.name.includes('auth-token') || c.name.includes('sb-')
  )

  if (!hasSession && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (hasSession && ['/login', '/signup', '/magic-link'].includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/signup',
    '/magic-link',
    '/auth/:path*',
  ],
}
