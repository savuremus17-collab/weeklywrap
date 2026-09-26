// Locație: src/app/checkout/page.tsx
//
// Rol: userul ajunge aici DUPĂ ce e deja autentificat (fie prin Google OAuth,
// cu redirect din /auth/callback?next=/checkout?plan=X, fie navigând direct),
// cu un plan ales în URL (?plan=monthly|yearly). Pagina pornește imediat
// sesiunea de Stripe Checkout și redirecționează — nu are UI vizibil, în afară
// de un loader scurt.
//
// Protecție: adaugă "/checkout" în middleware.ts (vezi mai jos), la fel ca
// "/dashboard", ca userii neautentificați să fie trimiși spre /login.

"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PLANS } from "@/lib/stripe/plans";

const PLAN_PARAM_TO_ID: Record<string, (typeof PLANS)[number]["id"]> = {
  monthly: "pro",
  yearly: "yearly",
};

function CheckoutRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const planParam = searchParams.get("plan");
    const plan = planParam ? PLANS.find((p) => p.id === PLAN_PARAM_TO_ID[planParam]) : undefined;

    if (!plan?.stripePriceId) {
      router.replace("/dashboard");
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/stripe/create-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ priceId: plan.stripePriceId }),
        });
        const data = await res.json();
        if (cancelled) return;

        if (res.ok && data.url) {
          window.location.href = data.url;
          return;
        }
        toast.error(data.error ?? "Couldn't start checkout — pick a plan from your dashboard instead.");
        setFailed(true);
        router.replace("/dashboard");
      } catch {
        if (cancelled) return;
        toast.error("Couldn't start checkout — pick a plan from your dashboard instead.");
        setFailed(true);
        router.replace("/dashboard");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [searchParams, router]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-sm text-muted-foreground">
      <Loader2 className="size-6 animate-spin" />
      <p>{failed ? "Redirecting to your dashboard…" : "Setting up your checkout…"}</p>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutRedirect />
    </Suspense>
  );
}
