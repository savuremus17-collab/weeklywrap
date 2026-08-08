import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'

let _supabase: SupabaseClient | null = null

function getClient(): SupabaseClient {
  if (!_supabase) {
    _supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  return _supabase
}

// Exported as a Proxy so existing call sites (`supabase.auth.getUser()`,
// `supabase.from(...)`, `supabase.storage.from(...)`, etc.) keep working
// unchanged, while the real client is only constructed on first actual use
// in the browser — not at module-import/SSR-render time. This avoids
// crashing prerendering of pages (e.g. /_not-found) that pull this module
// in indirectly via a shared provider, in environments where the public
// env vars aren't available at that exact point.
export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    return Reflect.get(getClient(), prop, receiver)
  },
})
