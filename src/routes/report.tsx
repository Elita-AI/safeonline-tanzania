import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLang, ui } from "@/lib/i18n";
import { categories } from "@/lib/content";
import { buildReportPayload } from "@/lib/report-payload";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle2, Lock } from "lucide-react";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Report a Problem — SafeOnline" },
      { name: "description", content: "Report online abuse or harassment privately to the SafeOnline team. Bilingual form, optional contact details." },
      { property: "og:title", content: "Report a Problem — SafeOnline" },
      { property: "og:description", content: "Report online abuse privately. Optional contact details, seen only by the SafeOnline team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ReportPage,
});

const MAX_DESCRIPTION = 4000;

function ReportPage() {
  const { t } = useLang();
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [region, setRegion] = useState("");
  const [contact, setContact] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!category) {
      setError(t({ en: "Please choose what happened.", sw: "Tafadhali chagua kilichotokea." }));
      return;
    }
    if (!description.trim()) {
      setError(t({ en: "Please write what happened.", sw: "Tafadhali andika kilichotokea." }));
      return;
    }
    if (!consent) {
      setError(t({ en: "Please tick the consent box so we may store the report.", sw: "Tafadhali weka alama kwenye kisanduku cha ridhaa ili tuweze kuhifadhi ripoti." }));
      return;
    }
    setBusy(true);
    const { error: err } = await supabase.from("reports").insert(
      buildReportPayload({ category, description, region, contact, anonymous, consent }),
    );
    setBusy(false);
    if (err) {
      setError(t({ en: "Sending failed. Please try again.", sw: "Kutuma kumeshindikana. Tafadhali jaribu tena." }));
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14">
        <div className="rounded-2xl border bg-card p-6 shadow-soft text-center">
          <CheckCircle2 className="size-10 text-primary mx-auto" aria-hidden />
          <h1 className="font-display text-2xl text-primary mt-3">{t({ en: "Thank you for reporting", sw: "Asante kwa kuripoti" })}</h1>
          <p className="text-muted-foreground mt-3 text-sm">
            {anonymous
              ? t({ en: "Your anonymous report has been saved without contact or region details. Only the SafeOnline team can see it, and it counts toward our report totals. We cannot contact you about this report.", sw: "Ripoti yako isiyo na utambulisho imehifadhiwa bila maelezo ya mawasiliano au mkoa. Timu ya SafeOnline pekee inaweza kuiona, na inahesabiwa katika jumla ya ripoti. Hatuwezi kuwasiliana nawe kuhusu ripoti hii." })
              : t({ en: "Your report has been saved and is visible only to the SafeOnline team. We review reports to improve guidance and support. We may contact you using the details you gave, if any.", sw: "Ripoti yako imehifadhiwa na inaonekana na timu ya SafeOnline pekee. Tunakagua ripoti kuboresha mwongozo na msaada. Tunaweza kuwasiliana nawe kwa maelezo uliyotoa, ikiwa yapo." })}
          </p>
          <p className="text-sm mt-4 flex items-center justify-center gap-2">
            <AlertTriangle className="size-4 text-accent shrink-0" />
            {t(ui.emergency)}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild variant="secondary" className="rounded-full">
              <Link to="/guide">{t({ en: "Get Help Now", sw: "Pata Msaada Sasa" })}</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/directory">{t({ en: "Find Support Services", sw: "Tafuta Huduma za Msaada" })}</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-display text-4xl text-primary">{t({ en: "Report a Problem", sw: "Ripoti Tatizo" })}</h1>
      <p className="text-muted-foreground mt-3">
        {t({ en: "Tell us what happened. The report goes privately to the SafeOnline team and helps us improve guidance and referrals.", sw: "Tuambie kilichotokea. Ripoti inapelekwa kwa siri kwa timu ya SafeOnline na husaidia kuboresha mwongozo na rufaa." })}
      </p>
      <p className="text-sm mt-3 flex items-start gap-2 rounded-2xl border bg-card p-4">
        <AlertTriangle className="size-4 text-accent shrink-0 mt-0.5" />
        <span>{t({ en: "This is not an emergency service. If you are in immediate danger, move to a safe place and call 112.", sw: "Hii si huduma ya dharura. Uko hatarini sasa hivi? Nenda mahali salama na piga 112." })}</span>
      </p>

      <form onSubmit={submit} className="mt-6 space-y-5 rounded-2xl border bg-card p-5">
        <fieldset className="space-y-2 border-b pb-5">
          <legend className="font-display text-xl text-primary mb-3">{t({ en: "Anonymous reporting", sw: "Kuripoti bila utambulisho" })}</legend>
          <label className="flex items-start gap-3 text-sm font-medium">
            <input type="checkbox" checked={anonymous} onChange={(e) => {
              setAnonymous(e.target.checked);
              setRegion("");
              setContact("");
            }} className="mt-1 size-4" />
            <span>{t({ en: "Send anonymously — no contact or region details", sw: "Tuma bila utambulisho — bila mawasiliano au mkoa" })}</span>
          </label>
          <p className="text-sm text-muted-foreground">{t({ en: "We never ask for your name. To stay anonymous, leave names, phone numbers, email addresses and other identifying details out of your description. Your report stays private and still counts. We cannot follow up without contact details.", sw: "Hatuombi jina lako kamwe. Ili ubaki bila utambulisho, usiandike majina, namba za simu, barua pepe au maelezo mengine yanayoweza kukutambulisha. Ripoti yako inabaki ya siri na bado inahesabiwa. Hatuwezi kufuatilia bila maelezo ya mawasiliano." })}</p>
        </fieldset>
        <label className="block text-sm font-medium">
          {t({ en: "What happened? *", sw: "Nini kilichotokea? *" })}
          <select
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm"
          >
            <option value="">{t({ en: "Choose one…", sw: "Chagua moja…" })}</option>
            {categories.map((c) => (
              <option key={c.id} value={t(c.title)}>
                {t(c.title)}
              </option>
            ))}
            <option value={t({ en: "Other", sw: "Nyingine" })}>{t({ en: "Other", sw: "Nyingine" })}</option>
          </select>
        </label>

        <label className="block text-sm font-medium">
          {t({ en: "Describe it in your own words *", sw: "Eleza kwa maneno yako *" })}
          <textarea
            required
            rows={6}
            maxLength={MAX_DESCRIPTION}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t({ en: "You do not have to give names. Write only what you are comfortable sharing.", sw: "Huhitaji kutoa majina. Andika tu unachokubali kushiriki." })}
            className="mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm"
          />
          <span className="text-xs text-muted-foreground">
            {description.length}/{MAX_DESCRIPTION}
          </span>
        </label>

        {!anonymous && <>
        <label className="block text-sm font-medium">
          {t({ en: "Region (optional)", sw: "Mkoa (hiari)" })}
          <input
            type="text"
            maxLength={80}
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder={t({ en: "e.g. Dar es Salaam — leave empty if you prefer", sw: "k.m. Dar es Salaam — acha wazi kama unapendelea" })}
            className="mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm"
          />
        </label>

        <label className="block text-sm font-medium">
          {t({ en: "How can we reach you? (optional)", sw: "Tunawezaje kukufikia? (hiari)" })}
          <input
            type="text"
            maxLength={200}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder={t({ en: "Phone number or email — only if you want follow-up", sw: "Namba ya simu au barua pepe — ukitaka tufuate nawe tu" })}
            className="mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm"
          />
        </label>

        </>}

        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 size-4"
          />
          <span>
            {t({ en: "I agree that SafeOnline may store this report so the team can review and follow up. Reports are visible only to the SafeOnline team.", sw: "Ninakubali SafeOnline ihifadhi ripoti hii ili timu iikague na iwasiliane nawe. Ripoti zinaonekana na timu ya SafeOnline pekee." })}
          </span>
        </label>

        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" className="w-full rounded-xl" disabled={busy}>
          {busy ? t({ en: "Sending…", sw: "Inatuma…" }) : t({ en: "Send report", sw: "Tuma ripoti" })}
        </Button>
      </form>

      <p className="text-xs text-muted-foreground mt-4 flex items-center gap-2">
        <Lock className="size-3.5 shrink-0" />
        {t({ en: "Nothing else is stored. Assistant chats are never saved. You can read more on the Privacy page.", sw: "Hakuna kinachohifadhiwa zaidi. Mazungumzo hayahifadhiwi kamwe. Soma zaidi kwenye ukurasa wa Faragha." })}
      </p>
    </div>
  );
}
