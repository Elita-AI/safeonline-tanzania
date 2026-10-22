import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { lawInfo } from "@/lib/content";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/law")({
  head: () => ({
    meta: [
      { title: "Know the Law: the Cybercrimes Act, 2015 — SafeOnline" },
      { name: "description", content: "A plain-language summary of Tanzania's Cybercrimes Act, 2015 and its minimum penalties, with links to the official government text." },
      { property: "og:title", content: "Know the Law: the Cybercrimes Act, 2015 — SafeOnline" },
      { property: "og:description", content: "What the Cybercrimes Act covers and the minimum penalties — plain language, English and Kiswahili." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Law,
});

function Law() {
  const { t } = useLang();
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link to="/guide" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
        <ArrowLeft className="size-4" aria-hidden /> {t({ en: "Back to Safety Guide", sw: "Rudi kwa Mwongozo wa Usalama" })}
      </Link>
      <h1 className="font-display text-4xl text-primary">{t(lawInfo.title)}</h1>
      <p className="text-muted-foreground mt-3 max-w-3xl">{t(lawInfo.intro)}</p>
      <div className="mt-8 space-y-4">
        {lawInfo.offences.map((o) => (
          <section key={o.heading.en} className="rounded-2xl border bg-card p-6">
            <h2 className="font-display text-xl text-primary">{t(o.heading)}</h2>
            <p className="mt-2">{t(o.body)}</p>
            <p className="mt-3 text-sm rounded-xl bg-secondary px-4 py-3">
              <span className="font-semibold">{t({ en: "Penalty under the Act: ", sw: "Adhabu chini ya sheria: " })}</span>
              {t(o.penalty)}
            </p>
          </section>
        ))}
      </div>
      <p className="text-sm text-muted-foreground mt-6 max-w-3xl">{t(lawInfo.penaltyNote)}</p>
      <p className="text-sm text-muted-foreground mt-3 max-w-3xl">{t(lawInfo.note)}</p>
      <p className="mt-6 font-semibold">{t(lawInfo.linksLabel)}</p>
      <ul className="mt-2 space-y-2 mb-4">
        {lawInfo.links.map((l) => (
          <li key={l.href}>
            <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4 hover:opacity-80">
              {t(l.label)} ↗
            </a>
          </li>
        ))}
      </ul>
      <p className="text-xs text-muted-foreground">
        {t({ en: "SafeOnline links to the official government text only. SafeOnline does not give legal advice.", sw: "SafeOnline inaeleza kwenye matini rasmi ya serikali pekee. SafeOnline haitoi ushauri wa kisheria." })}
      </p>
    </div>
  );
}
