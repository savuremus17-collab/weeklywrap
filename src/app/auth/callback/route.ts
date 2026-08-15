import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const type = searchParams.get("type");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const redirectUrl =
      type === "recovery"
        ? (() => {
            const url = new URL(`${origin}/update-password`);
            url.searchParams.set("redirected", "true");
            return url;
          })()
        : new URL(`${origin}${next}`);

    // Create the response up front and attach session cookies directly to
    // IT (not to `request.cookies`, which the browser never sees). This is
    // the object we actually return, so any Set-Cookie headers written here
    // are the ones the browser will store.
    const response = NextResponse.redirect(redirectUrl);

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return response;
    }
  }

  const url = new URL(`${origin}/login`);
  url.searchParams.set("error", "Authentication failed. Please try again.");
  return NextResponse.redirect(url);
}
