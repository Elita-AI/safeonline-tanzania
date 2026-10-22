import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories, lawInfo, type CategoryId } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { GuidePanel } from "@/components/GuidePanel";
import { Feedback } from "@/components/SiteLayout";

export const Route = createFileRoute("/guide")({
  validateSearch: (s: Record<string, unknown>): { c?: CategoryId } =>
    categories.some((c) => c.id === s["c"]) ? { c: s["c"] as CategoryId } : {},
  head: () => ({
    meta: [
      { title: "Personal Safety Guide — SafeOnline" },
      { name: "description", content: "Tailored checklists for blackmail, cyberbullying, hacking, impersonation and more." },
      { property: "og:title", content: "Personal Safety Guide — SafeOnline" },
      { property: "og:description", content: "Choose your situation and get a practical safety checklist." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Guide,
});

function Guide() {
  const { t } = useLang();
  const { c } = Route.useSearch();
  const nav = useNavigate({ from: "/guide" });
  const active = categories.find((x) => x.id === c);
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl text-primary">{t({ en: "Personal Safety Guide", sw: "Mwongozo wa Usalama Binafsi" })}</h1>
      <p className="text-muted-foreground mt-2">{t({ en: "Choose the situation closest to yours.", sw: "Chagua hali inayofanana zaidi na yako." })}</p>
      <div className="grid lg:grid-cols-[320px_1fr] gap-6 mt-6">
        <div className="flex flex-col gap-2">
          {categories.map((x) => (
            <button key={x.id} onClick={() => nav({ search: { c: x.id } })} aria-pressed={x.id === c} className={`text-left rounded-2xl border p-4 transition ${x.id === c ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:border-primary"}`}>
              <p className="font-semibold">{t(x.title)}</p>
              <p className={`text-sm ${x.id === c ? "opacity-80" : "text-muted-foreground"}`}>{t(x.summary)}</p>
            </button>
          ))}
        </div>
        <div className="space-y-6">
          {active ? (<><GuidePanel key={active.id} c={active} /><Feedback /></>) : (
            <div className="rounded-2xl border border-dashed p-10 text-center text-muted-foreground">{t({ en: "Select a situation to see your checklist.", sw: "Chagua hali ili kuona orodha yako." })}</div>
          )}
        </div>
      </div>
      <section aria-labelledby="law-heading" className="mt-10 rounded-2xl border bg-card p-6">
        <h2 id="law-heading" className="font-display text-2xl text-primary">{t(lawInfo.title)}</h2>
        <p className="text-muted-foreground mt-3 max-w-3xl">{t(lawInfo.intro)}</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {lawInfo.offences.map((o) => (
            <div key={o.heading.en} className="rounded-xl border border-dashed p-4">
              <h3 className="font-semibold">{t(o.heading)}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t(o.body)}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-5 max-w-3xl">{t(lawInfo.note)}</p>
        <p className="mt-4 font-semibold text-sm">{t(lawInfo.linksLabel)}</p>
        <ul className="mt-2 space-y-2">
          {lawInfo.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4 hover:opacity-80">
                {t(l.label)} ↗
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground mt-4">
          {t({ en: "SafeOnline links to the official government text only. SafeOnline does not give legal advice.", sw: "SafeOnline inaeleza kwenye matini rasmi ya serikali pekee. SafeOnline haitoi ushauri wa kisheria." })}
        </p>
      </section>
    </div>
  );
}
