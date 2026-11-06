import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { PageImage } from "@/components/PageImage";
import tipsImg from "@/assets/safety_tips_classroom.jpg.asset.json";
import { Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories, cyberthreats, lawInfo, type CategoryId } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { GuidePanel } from "@/components/GuidePanel";
import { Feedback } from "@/components/SiteLayout";

export const Route = createFileRoute("/guide")({
  validateSearch: (s: Record<string, unknown>): { c?: CategoryId } =>
    categories.some((c) => c.id === s["c"]) ? { c: s["c"] as CategoryId } : {},
  head: () => ({
    meta: [
      { title: "Cyberthreats & Safety Tips — SafeOnline" },
      { name: "description", content: "Common cyberthreats explained, plus tailored checklists for blackmail, cyberbullying, hacking, impersonation and more." },
      { property: "og:title", content: "Cyberthreats & Safety Tips — SafeOnline" },
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
      <h1 className="font-display text-4xl text-primary">{t({ en: "Cyberthreats & Safety Tips", sw: "Vitisho vya Mtandaoni na Vidokezo vya Usalama" })}</h1>
      <PageImage fit="full" width={1280} height={720} src={tipsImg.url} alt={t({ en: "A woman teacher showing schoolgirls a screen that lists common cyberthreats: mobile money fraud, phishing, cyberbullying, online scams, fake accounts and account hacking", sw: "Mwalimu mwanamke akiwasilishia wasichana skrini inayoorodhesha vitisho vya mtandaoni: ulaghai wa fedha za simu, ulaghai wa phishing, unyanyasaji mtandaoni, matapeli mtandaoni, akaunti za uongo na kuvamiwa kwa akaunti" })} className="mt-4 max-w-4xl mx-auto" />
      <p className="text-muted-foreground mt-2">{t({ en: "Know the common threats, then choose the situation closest to yours for a safety checklist.", sw: "Jua vitisho vya kawaida, kisha chagua hali inayofanana zaidi na yako ili upate orodha ya usalama." })}</p>
      <section className="mt-8" aria-label={t({ en: "Common cyberthreats", sw: "Vitisho vya kawaida vya mtandaoni" })}>
        <h2 className="font-display text-2xl text-primary">{t({ en: "Common cyberthreats", sw: "Vitisho vya kawaida vya mtandaoni" })}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
          {cyberthreats.map((th) => (
            <div key={th.name.en} className="rounded-2xl border bg-card p-4">
              <p className="font-semibold">{t(th.name)}</p>
              <p className="text-sm text-muted-foreground mt-1">{t(th.what)}</p>
            </div>
          ))}
        </div>
      </section>
      <h2 className="font-display text-2xl text-primary mt-10">{t({ en: "Safety tips for your situation", sw: "Vidokezo vya usalama kwa hali yako" })}</h2>
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
      <Link to="/law" className="mt-10 flex flex-wrap items-center gap-4 rounded-2xl border border-primary/40 bg-card p-6 hover:border-primary transition">
        <span className="inline-flex items-center justify-center size-12 rounded-full bg-secondary text-primary shrink-0">
          <Scale className="size-6" aria-hidden />
        </span>
        <div className="flex-1 min-w-[220px]">
          <h2 className="font-display text-2xl text-primary">{t(lawInfo.title)}</h2>
          <p className="text-muted-foreground mt-1 text-sm">{t(lawInfo.short)}</p>
        </div>
        <Button className="rounded-full shrink-0">{t({ en: "Know the Law", sw: "Fahamu Sheria" })}</Button>
      </Link>
    </div>
  );
}
