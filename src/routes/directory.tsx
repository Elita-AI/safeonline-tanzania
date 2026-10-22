import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search, Phone, Globe, BadgeAlert } from "lucide-react";
import { services, serviceCategories, type ServiceCategory } from "@/lib/content";
import { useLang, ui } from "@/lib/i18n";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/directory")({
  validateSearch: (s: Record<string, unknown>): { cat?: ServiceCategory | undefined; q?: string | undefined } => ({
    cat: s.cat && s.cat in serviceCategories ? (s.cat as ServiceCategory) : undefined,
    q: typeof s.q === "string" ? s.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Support Services Directory — SafeHer Tanzania" },
      { name: "description", content: "Search GBV, legal aid, counselling, child protection, digital security and emergency services in Tanzania." },
      { property: "og:title", content: "Support Services — SafeHer Tanzania" },
      { property: "og:description", content: "A searchable directory of support services in Tanzania." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Directory,
});

function Directory() {
  const { t, lang } = useLang();
  const { cat, q = "" } = Route.useSearch();
  const nav = useNavigate({ from: "/directory" });
  const query = q.toLowerCase();
  const list = services.filter((s) => (!cat || s.category === cat) && (!query || `${s.name} ${s.region} ${serviceCategories[s.category].en} ${serviceCategories[s.category].sw}`.toLowerCase().includes(query)));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl text-primary">{t({ en: "Support Services", sw: "Huduma za Msaada" })}</h1>
      <div className="mt-3 rounded-xl bg-coral-soft p-4 text-sm flex gap-2">
        <BadgeAlert className="size-5 text-accent shrink-0" />
        {t({ en: "Most records below are demonstration data marked [Demo] and contain no real contact details. No record has yet been verified by an administrator.", sw: "Rekodi nyingi hapa chini ni za majaribio zenye alama [Demo] na hazina mawasiliano halisi. Hakuna rekodi iliyothibitishwa na msimamizi bado." })}
      </div>
      <div className="relative mt-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input value={q} onChange={(e) => nav({ search: (p) => ({ ...p, q: e.target.value || undefined }), replace: true })} placeholder={t({ en: "Search by name, region or service…", sw: "Tafuta kwa jina, mkoa au huduma…" })} className="pl-9 h-12 rounded-xl bg-card" aria-label="Search" />
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        <button onClick={() => nav({ search: (p) => ({ ...p, cat: undefined }) })} className={`rounded-full px-4 py-1.5 text-sm border ${!cat ? "bg-primary text-primary-foreground border-primary" : "bg-card"}`}>{t({ en: "All", sw: "Zote" })}</button>
        {(Object.keys(serviceCategories) as ServiceCategory[]).map((k) => (
          <button key={k} onClick={() => nav({ search: (p) => ({ ...p, cat: k }) })} className={`rounded-full px-4 py-1.5 text-sm border ${cat === k ? "bg-primary text-primary-foreground border-primary" : "bg-card"}`}>{t(serviceCategories[k])}</button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {list.length === 0 && <p className="text-muted-foreground col-span-full py-10 text-center">{t({ en: "No services match your search.", sw: "Hakuna huduma inayolingana na utafutaji wako." })}</p>}
        {list.map((s) => (
          <article key={s.id} className="rounded-2xl border bg-card p-5">
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <span className="rounded-full bg-secondary text-secondary-foreground px-2.5 py-1">{t(serviceCategories[s.category])}</span>
              {s.demo && <span className="rounded-full bg-coral-soft text-accent px-2.5 py-1">{t(ui.demo)}</span>}
              {!s.verified && <span className="rounded-full border px-2.5 py-1 text-muted-foreground">{t({ en: "Unverified", sw: "Haijathibitishwa" })}</span>}
            </div>
            <h2 className="font-semibold text-lg mt-3">{s.name}</h2>
            <dl className="text-sm mt-2 space-y-1 text-muted-foreground">
              <div><dt className="inline font-medium text-foreground">{t({ en: "Region", sw: "Mkoa" })}: </dt><dd className="inline">{s.region}</dd></div>
              <div><dt className="inline font-medium text-foreground">{t({ en: "Languages", sw: "Lugha" })}: </dt><dd className="inline">{s.languages.join(", ")}</dd></div>
              <div><dt className="inline font-medium text-foreground">{t({ en: "Hours", sw: "Saa" })}: </dt><dd className="inline">{s.hours ? t(s.hours) : t({ en: "Not verified", sw: "Hazijathibitishwa" })}</dd></div>
              <div><dt className="inline font-medium text-foreground">{t({ en: "Last verified", sw: "Ilithibitishwa mwisho" })}: </dt><dd className="inline">{s.lastVerified ?? t({ en: "Not yet", sw: "Bado" })}</dd></div>
            </dl>
            {s.note && <p className="text-xs mt-2 italic text-muted-foreground">{t(s.note)}</p>}
            <div className="flex gap-2 mt-4">
              {s.phone ? <a href={`tel:${s.phone}`} className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold"><Phone className="size-4" /> {s.phone}</a>
                : <span className="text-xs text-muted-foreground">{lang === "en" ? "Contact details to be added after verification." : "Mawasiliano yataongezwa baada ya kuthibitishwa."}</span>}
              {s.link && <a href={s.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm"><Globe className="size-4" /> Website</a>}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
