import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search, Phone, Globe, BadgeAlert, MessageCircle, Mail, Pin } from "lucide-react";
import { services, serviceCategories, serviceRegions, NATIONAL, type ServiceCategory, type Service } from "@/lib/content";
import { useLang, ui } from "@/lib/i18n";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/directory")({
  validateSearch: (s: Record<string, unknown>): { cat?: ServiceCategory | undefined; q?: string | undefined; region?: string | undefined } => ({
    cat: typeof s["cat"] === "string" && s["cat"] in serviceCategories ? (s["cat"] as ServiceCategory) : undefined,
    q: typeof s["q"] === "string" ? s["q"] : undefined,
    region: typeof s["region"] === "string" && serviceRegions.includes(s["region"]) ? s["region"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Support Services Directory — SafeOnline" },
      { name: "description", content: "Search GBV, legal aid, counselling, child protection, digital security and emergency services in Tanzania." },
      { property: "og:title", content: "Support Services — SafeOnline" },
      { property: "og:description", content: "A searchable directory of support services in Tanzania." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Directory,
});

function Directory() {
  const { t, lang } = useLang();
  const { cat, q = "", region } = Route.useSearch();
  const nav = useNavigate({ from: "/directory" });
  const query = q.toLowerCase();
  const matches = (s: Service) => (!cat || s.categories.includes(cat)) && (!query || `${s.name.en} ${s.name.sw} ${s.region} ${s.categories.map((c) => `${serviceCategories[c].en} ${serviceCategories[c].sw}`).join(" ")}`.toLowerCase().includes(query));
  const pinned = services.filter((s) => s.pinned);
  const rest = services.filter((s) => !s.pinned && matches(s) && (!region || s.region === region || s.region === NATIONAL));
  const list = region ? [...rest.filter((s) => s.region === region), ...rest.filter((s) => s.region === NATIONAL)] : rest;
  const card = (s: Service) => (
    <article key={s.id} className={`rounded-2xl border bg-card p-5 ${s.pinned ? "border-primary border-2" : ""}`}>
      <div className="flex flex-wrap gap-2 text-xs font-semibold">
        {s.pinned && <span className="rounded-full bg-primary text-primary-foreground px-2.5 py-1 inline-flex items-center gap-1"><Pin className="size-3" />{t({ en: "Pinned", sw: "Imebandikwa" })}</span>}
        {s.categories.map((c) => <span key={c} className="rounded-full bg-secondary text-secondary-foreground px-2.5 py-1">{t(serviceCategories[c])}</span>)}
        {!s.verified && <span className="rounded-full border px-2.5 py-1 text-muted-foreground">{t({ en: "Unverified", sw: "Haijathibitishwa" })}</span>}
      </div>
      <h2 className="font-semibold text-lg mt-3">{t(s.name)}</h2>
      <dl className="text-sm mt-2 space-y-1 text-muted-foreground">
        <div><dt className="inline font-medium text-foreground">{t({ en: "Region", sw: "Mkoa" })}: </dt><dd className="inline">{s.region === NATIONAL ? t({ en: "National", sw: "Kitaifa" }) : s.region}</dd></div>
        {s.hours && <div><dt className="inline font-medium text-foreground">{t({ en: "Hours", sw: "Saa" })}: </dt><dd className="inline">{t(s.hours)}</dd></div>}
        {s.lastVerified && <div><dt className="inline font-medium text-foreground">{t({ en: "Last verified", sw: "Ilithibitishwa mwisho" })}: </dt><dd className="inline">{s.lastVerified}</dd></div>}
      </dl>
      {s.note && <p className="text-xs mt-2 italic text-muted-foreground">{t(s.note)}</p>}
      {s.contacts?.length ? <ul className="mt-4 divide-y rounded-xl border bg-secondary/40">
        {s.contacts.map((c) => <li key={c.phone} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
          <span className="text-muted-foreground">{c.label}</span>
          <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold"><Phone className="size-3.5" /> {c.phone}</a>
        </li>)}
      </ul> : null}
      <div className="flex flex-wrap gap-2 mt-4">
        {s.phones.map((p) => <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold"><Phone className="size-4" /> {p}</a>)}
        {s.whatsapp.map((w) => <a key={`wa-${w}`} href={`https://wa.me/255${w.replace(/^0/, "")}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-primary text-primary px-4 py-2 text-sm font-semibold"><MessageCircle className="size-4" /> WhatsApp {w}</a>)}
        {s.email && <a href={`mailto:${s.email}`} className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm"><Mail className="size-4" /> {s.email}</a>}
        {s.link && <a href={s.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm"><Globe className="size-4" /> {t({ en: "Website", sw: "Tovuti" })}</a>}
        {s.phones.length === 0 && !s.contacts?.length && <span className="text-xs text-muted-foreground">{lang === "en" ? "Contact details to be added after verification." : "Mawasiliano yataongezwa baada ya kuthibitishwa."}</span>}
      </div>
    </article>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl text-primary">{t({ en: "Support Services", sw: "Huduma za Msaada" })}</h1>
      <div className="mt-3 rounded-xl bg-coral-soft p-4 text-sm flex gap-2">
        <BadgeAlert className="size-5 text-accent shrink-0" />
        {t({ en: "Contact details below come from public lists but have not yet been verified by the SafeOnline team. Please confirm before relying on them.", sw: "Mawasiliano hapa chini yametoka kwenye orodha za umma lakini bado hayajathibitishwa na timu ya SafeOnline. Tafadhali thibitisha kabla ya kuyategemea." })}
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-6">{pinned.map(card)}</div>
      <div className="relative mt-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input value={q} onChange={(e) => nav({ search: (p) => ({ ...p, q: e.target.value || undefined }), replace: true })} placeholder={t({ en: "Search by name, region or service…", sw: "Tafuta kwa jina, mkoa au huduma…" })} className="pl-9 h-12 rounded-xl bg-card" aria-label="Search" />
      </div>
      <div className="flex flex-wrap gap-2 mt-4 items-center">
        <select value={region ?? ""} onChange={(e) => nav({ search: (p) => ({ ...p, region: e.target.value || undefined }) })} aria-label={t({ en: "Region", sw: "Mkoa" })} className="rounded-full border bg-card px-4 py-1.5 text-sm">
          <option value="">{t({ en: "All regions", sw: "Mikoa yote" })}</option>
          {serviceRegions.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
        <button onClick={() => nav({ search: (p) => ({ ...p, cat: undefined }) })} className={`rounded-full px-4 py-1.5 text-sm border ${!cat ? "bg-primary text-primary-foreground border-primary" : "bg-card"}`}>{t({ en: "All", sw: "Zote" })}</button>
        {(Object.keys(serviceCategories) as ServiceCategory[]).map((k) => (
          <button key={k} onClick={() => nav({ search: (p) => ({ ...p, cat: k }) })} className={`rounded-full px-4 py-1.5 text-sm border ${cat === k ? "bg-primary text-primary-foreground border-primary" : "bg-card"}`}>{t(serviceCategories[k])}</button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {list.length === 0 && <p className="text-muted-foreground col-span-full py-10 text-center">{t({ en: "No services match your search.", sw: "Hakuna huduma inayolingana na utafutaji wako." })}</p>}
        {list.map(card)}
      </div>
    </div>
  );
}
