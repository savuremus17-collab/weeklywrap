import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(
  request: NextRequest
) {
  let response = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(
            ({ name, value, options }) => {
              request.cookies.set(
                name,
                value
              )

              response.cookies.set(
                name,
                value,
                options
              )
            }
          )
        },
      },
    }
  )

  /*
   * IMPORTANT:
   * This refreshes the Supabase session and
   * keeps the authentication cookies synchronized
   * between the browser and the server.
   */
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  /*
   * Auth callback routes
   */
  if (pathname.startsWith("/auth/")) {
    return response
  }

  /*
   * Protected dashboard
   */
  if (
    pathname.startsWith("/dashboard") &&
    !user
  ) {
    const url = request.nextUrl.clone()

    url.pathname = "/login"

    return NextResponse.redirect(url)
  }

  /*
   * Prevent logged-in users from returning
   * to login/signup pages.
   */
  if (
    user &&
    [
      "/login",
      "/signup",
      "/magic-link",
    ].includes(pathname)
  ) {
    const url = request.nextUrl.clone()

    url.pathname = "/dashboard"

    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/signup",
    "/magic-link",
    "/auth/:path*",
  ],
}
