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
