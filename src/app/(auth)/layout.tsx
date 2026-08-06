import Link from "next/link";
import { Logo } from "@/components/brand/logo";

export const metadata = {
  title: {
    template: "%s — WeeklyWrap",
    default: "Authentication — WeeklyWrap",
  },
  description: "Sign in to your WeeklyWrap account.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      {/* Logo */}
      <div className="relative mb-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo className="h-8 w-8" />
          <span className="text-xl font-bold tracking-tight text-foreground">
            WeeklyWrap
          </span>
        </Link>
      </div>

      {/* Card */}
      <div className="relative w-full max-w-md mx-auto">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent rounded-2xl blur-sm" />
        <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-8 shadow-2xl">
          {children}
        </div>
      </div>

      {/* Footer */}
      <p className="relative mt-8 text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} WeeklyWrap. All rights reserved.
      </p>
    </div>
  );
}
