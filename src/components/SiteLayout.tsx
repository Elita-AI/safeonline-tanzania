import { Link } from "@tanstack/react-router";
import { LogOut, ShieldCheck, Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { ui, useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

function quickExit() {
  window.location.replace("https://www.google.com/search?q=weather+dar+es+salaam");
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && e.shiftKey) quickExit(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const links = [
    { to: "/", label: ui.navHome },
    { to: "/assistant", label: ui.navChat },
    { to: "/guide", label: ui.navGuide },
    { to: "/directory", label: ui.navDirectory },
    { to: "/privacy", label: ui.navPrivacy },
  ] as const;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-coral-soft text-foreground text-xs text-center px-4 py-1.5">{t(ui.prototype)}</div>
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto max-w-6xl flex items-center gap-3 px-4 h-16">
          <Link to="/" className="flex items-center gap-2 font-display text-xl font-semibold text-primary">
            <ShieldCheck className="size-6" aria-hidden /> SafeHer <span className="text-accent">TZ</span>
          </Link>
          <nav className="hidden lg:flex gap-1 ml-6" aria-label="Main">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="px-3 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted" activeProps={{ className: "text-primary bg-secondary" }} activeOptions={{ exact: true }}>
                {t(l.label)}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <div role="group" aria-label="Language" className="flex rounded-full border p-0.5 text-xs font-semibold">
              {(["en", "sw"] as const).map((l) => (
                <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l} className={`px-2.5 py-1 rounded-full ${lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
                  {l === "en" ? "EN" : "SW"}
                </button>
              ))}
            </div>
            <Button variant="destructive" size="sm" className="rounded-full" onClick={quickExit} title={t(ui.quickExitNote)}>
              <LogOut className="size-4" /> {t(ui.quickExit)}
            </Button>
            <button className="lg:hidden p-2" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="lg:hidden border-t px-4 py-2 flex flex-col" aria-label="Mobile">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-3 font-medium border-b last:border-0">{t(l.label)}</Link>
            ))}
          </nav>
        )}
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t bg-card mt-16">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground space-y-2">
          <p className="font-display text-lg text-primary">SafeHer Tanzania — {t(ui.tagline)}</p>
          <p>{t(ui.emergency)} <span className="italic">({t(ui.toVerify)})</span></p>
          <p>{t(ui.quickExitNote)} {lang === "en" ? "Shortcut: Shift + Esc." : "Njia ya mkato: Shift + Esc."}</p>
        </div>
      </footer>
    </div>
  );
}

export function Feedback() {
  const { t } = useLang();
  const [done, setDone] = useState(false);
  return (
    <div className="rounded-2xl border bg-card p-4 flex flex-wrap items-center gap-3">
      {done ? <p className="text-sm text-muted-foreground">{t(ui.thanks)}</p> : (
        <>
          <p className="text-sm font-medium mr-auto">{t(ui.helpful)}</p>
          <Button size="sm" variant="secondary" onClick={() => setDone(true)}>{t(ui.yes)}</Button>
          <Button size="sm" variant="outline" onClick={() => setDone(true)}>{t(ui.no)}</Button>
        </>
      )}
    </div>
  );
}
