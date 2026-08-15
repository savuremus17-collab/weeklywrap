import { createClient } from "@supabase/supabase-js"

let _admin: ReturnType<typeof createClient> | null = null

function getAdminClient() {
  if (!_admin) {
    const url =
      process.env.NEXT_PUBLIC_SUPABASE_URL

    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!url) {
      throw new Error(
        "Missing NEXT_PUBLIC_SUPABASE_URL"
      )
    }

    if (!serviceRoleKey) {
      throw new Error(
        "Missing SUPABASE_SERVICE_ROLE_KEY"
      )
    }

    _admin = createClient(
      url,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    )
  }

  return _admin
}

export const supabaseAdmin = new Proxy(
  {} as ReturnType<typeof createClient>,
  {
    get(_target, prop, receiver) {
      return Reflect.get(
        getAdminClient(),
        prop,
        receiver
      )
    },
  }
)
