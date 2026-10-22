import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLang, ui } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Team Sign In — SafeHer Tanzania" },
      { name: "description", content: "Private sign-in for the SafeHer Tanzania team." },
      { property: "og:title", content: "Team Sign In — SafeHer Tanzania" },
      { property: "og:description", content: "Private sign-in for the SafeHer Tanzania team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { t } = useLang();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (err) {
      setError(t({ en: "Sign-in failed. Check the email and password.", sw: "Kuingia kumeshindikana. Angalia barua pepe na neno la siri." }));
      return;
    }
    await navigate({ to: "/admin" });
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-2xl border bg-card p-6 shadow-soft">
        <ShieldCheck className="size-8 text-primary" aria-hidden />
        <h1 className="font-display text-2xl text-primary mt-3">{t({ en: "Team Sign In", sw: "Kuingia kwa Timu" })}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t({ en: "Private area for the SafeHer team only.", sw: "Eneo la faragha kwa timu ya SafeHer pekee." })}
        </p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block text-sm font-medium">
            {t({ en: "Email", sw: "Barua pepe" })}
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm"
              autoComplete="email"
            />
          </label>
          <label className="block text-sm font-medium">
            {t({ en: "Password", sw: "Neno la siri" })}
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm"
              autoComplete="current-password"
            />
          </label>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full rounded-xl" disabled={busy}>
            {busy ? t({ en: "Signing in…", sw: "Inaingia…" }) : t({ en: "Sign in", sw: "Ingia" })}
          </Button>
        </form>
      </div>
    </div>
  );
}
