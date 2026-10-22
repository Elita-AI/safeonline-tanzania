import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import type { Category } from "@/lib/content";
import { useLang } from "@/lib/i18n";

export function Checklist({ items }: { items: Category["steps"] }) {
  const { t } = useLang();
  const [done, setDone] = useState<Record<number, boolean>>({});
  return (
    <ul className="space-y-2">
      {items.map((s, i) => (
        <li key={i}>
          <button onClick={() => setDone({ ...done, [i]: !done[i] })} aria-pressed={!!done[i]} className="w-full text-left flex gap-3 items-start rounded-xl border bg-card p-3 hover:border-primary">
            <span className={`mt-0.5 size-5 shrink-0 rounded-md border-2 grid place-items-center ${done[i] ? "bg-primary border-primary text-primary-foreground" : "border-input"}`}>{done[i] && <Check className="size-3.5" />}</span>
            <span className={done[i] ? "line-through text-muted-foreground" : ""}>{t(s)}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export function GuidePanel({ c }: { c: Category }) {
  const { t } = useLang();
  return (
    <div className="space-y-5">
      <h3 className="font-display text-2xl text-primary">{t(c.title)}</h3>
      <div>
        <p className="font-semibold mb-2">{t({ en: "Steps you could take", sw: "Hatua unazoweza kuchukua" })}</p>
        <Checklist items={c.steps} />
      </div>
      <div>
        <p className="font-semibold mb-2">{t({ en: "Preserving evidence safely", sw: "Kuhifadhi ushahidi kwa usalama" })}</p>
        <Checklist items={c.evidence} />
      </div>
      <div>
        <p className="font-semibold mb-2">{t({ en: "Reporting on the platform", sw: "Kuripoti kwenye jukwaa" })}</p>
        <Checklist items={c.platform} />
      </div>
      <div className="rounded-xl bg-secondary p-4 text-sm">
        {t({ en: "The safest action can vary depending on your circumstances. Trust your judgement — if doing something feels unsafe, it's okay not to do it. This is general guidance, not legal advice.", sw: "Hatua salama zaidi inaweza kutofautiana kulingana na hali yako. Amini hisia zako — ikiwa jambo linaonekana si salama, ni sawa kutolifanya. Huu ni mwongozo wa jumla, si ushauri wa kisheria." })}
      </div>
      <Link to="/directory" search={{ cat: c.referTo[0] }} className="inline-flex rounded-full bg-primary text-primary-foreground px-5 py-2.5 font-semibold text-sm">
        {t({ en: "Find support for this", sw: "Tafuta msaada kwa hili" })} →
      </Link>
    </div>
  );
}
