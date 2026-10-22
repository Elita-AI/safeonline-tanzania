import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ScanText, RotateCcw, ArrowRight, LifeBuoy, FileWarning, Home, ImageOff } from "lucide-react";
import { assessText, assessmentLabels, categories } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PrivacyNotice } from "@/components/PrivacyNotice";
import { EmergencyNotice } from "@/components/EmergencyNotice";

export const Route = createFileRoute("/check")({
  head: () => ({ meta: [
    { title: "Check a Message — SafeOnline" },
    { name: "description", content: "Check text in English or Kiswahili for demonstration warning signs, with practical safety guidance. Links are never visited and text is not stored." },
    { property: "og:title", content: "Check a Message — SafeOnline" },
    { property: "og:description", content: "Private on-device demonstration checks and next steps in English and Kiswahili." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: CheckPage,
});

function CheckPage() {
  const { t } = useLang();
  const [text, setText] = useState("");
  const [result, setResult] = useState<ReturnType<typeof assessText> | null>(null);
  const category = categories.find((item) => item.id === result?.category);
  return <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
    <div className="flex items-start gap-3">
      <ScanText className="size-8 text-primary shrink-0 mt-1" aria-hidden />
      <h1 className="font-display text-3xl text-primary mr-auto">{t({ en: "Check a Message", sw: "Kagua Ujumbe" })}</h1>
      <Button asChild variant="outline" size="icon" title={t({ en: "Main menu", sw: "Menyu kuu" })}><Link to="/" aria-label={t({ en: "Main menu", sw: "Menyu kuu" })}><Home className="size-4" /></Link></Button>
    </div>
    <PrivacyNotice />
    <p className="text-sm bg-coral-soft p-3 rounded-lg">{t({ en: "Demonstration assessment, not a legal determination. No live AI is connected: this check matches a limited set of safety signals and can miss slang, mixed-language meaning or context. It cannot verify a link or username.", sw: "Tathmini ya majaribio, si uamuzi wa kisheria. Hakuna AI halisi iliyounganishwa: ukaguzi huu hutambua dalili chache za usalama na unaweza kukosa misimu, maana ya lugha mchanganyiko au muktadha. Hauwezi kuthibitisha kiungo au jina la mtumiaji." })}</p>
    <form onSubmit={(event) => { event.preventDefault(); if (text.trim()) { setResult(assessText(text)); setText(""); } }} className="space-y-3">
      <label htmlFor="check-text" className="block font-semibold">{t({ en: "Message, link or username", sw: "Ujumbe, kiungo au jina la mtumiaji" })}</label>
      <Textarea id="check-text" value={text} onChange={(event) => { setText(event.target.value); setResult(null); }} maxLength={4000} rows={5} className="resize-y" placeholder={t({ en: "Paste text only — remove names and personal details…", sw: "Bandika maandishi pekee — ondoa majina na taarifa binafsi…" })} />
      <div className="flex items-start gap-2 text-sm text-muted-foreground"><ImageOff className="size-4 shrink-0 mt-0.5" /><p>{t({ en: "Do not upload intimate images. Screenshot uploads are unavailable because reliable intimate-image screening is not available. Describe the message in text instead.", sw: "Usipakie picha za faragha. Kupakia picha za skrini hakupatikani kwa sababu ukaguzi wa kuaminika wa picha za faragha haupo. Eleza ujumbe kwa maandishi badala yake." })}</p></div>
      <Button type="submit" disabled={!text.trim()}><ScanText className="size-4" />{t({ en: "Check text", sw: "Kagua maandishi" })}</Button>
    </form>
    {result && <section className="border-t pt-6 space-y-5" aria-live="polite">
      <div className="flex flex-wrap gap-3 items-center"><h2 className="font-display text-2xl text-primary mr-auto">{t({ en: "Assessment", sw: "Tathmini" })}</h2><Button variant="ghost" size="sm" onClick={() => setResult(null)}><RotateCcw className="size-4" />{t({ en: "Clear", sw: "Futa" })}</Button></div>
      <p className="text-sm font-semibold">{t({ en: "Demonstration assessment, not a legal determination", sw: "Tathmini ya majaribio, si uamuzi wa kisheria" })}</p>
      {result.immediateDanger && <EmergencyNotice />}
      <dl className="grid sm:grid-cols-2 gap-4">
        <div><dt className="text-sm text-muted-foreground">{t({ en: "Likely category", sw: "Aina inayowezekana" })}</dt><dd className="font-semibold mt-1">{result.category ? t(assessmentLabels[result.category]) : t({ en: "Unclear", sw: "Haijabainika" })}</dd></div>
        <div><dt className="text-sm text-muted-foreground">{t({ en: "Risk level", sw: "Kiwango cha hatari" })}</dt><dd className={`font-semibold mt-1 ${result.risk === "High" ? "text-destructive" : "text-primary"}`}>{result.risk === "High" ? t({ en: "High", sw: "Juu" }) : result.risk === "Medium" ? t({ en: "Medium", sw: "Wastani" }) : t({ en: "Lower", sw: "Chini" })}</dd></div>
      </dl>
      <p>{t(result.reason)}</p>
      <div><h3 className="font-semibold">{t({ en: "Warning signs found", sw: "Dalili zilizotambuliwa" })}</h3>{result.warnings.length ? <ul className="list-disc pl-5 mt-2 space-y-1">{result.warnings.map((warning) => <li key={warning.en}>{t(warning)}</li>)}</ul> : <p className="text-sm mt-2">{t({ en: "None matched. This does not establish safety.", sw: "Hakuna zilizotambuliwa. Hii haithibitishi usalama." })}</p>}</div>
      <p className="bg-secondary p-4 text-sm">{t({ en: "Confidence is limited. This tool can be wrong and cannot establish intent, identity or legality. If you feel unsafe or uncertain, seek human help even when the risk looks lower.", sw: "Uhakika ni mdogo. Zana hii inaweza kukosea na haiwezi kuthibitisha nia, utambulisho au uhalali. Ukihisi si salama au una mashaka, tafuta msaada wa mtu hata ikiwa hatari inaonekana ndogo." })}</p>
      <div><h3 className="font-semibold">{t({ en: "Next steps", sw: "Hatua zinazofuata" })}</h3>{category ? <ol className="list-decimal pl-5 mt-2 space-y-2">{category.steps.slice(0, 3).map((step) => <li key={step.en}>{t(step)}</li>)}</ol> : <p className="mt-2">{t({ en: "Do not open an unfamiliar link or share passwords, codes or money. Choose the closest situation in the safety guide or speak with someone you trust.", sw: "Usifungue kiungo usichokijua wala kutuma manenosiri, misimbo au pesa. Chagua hali inayokaribiana katika mwongozo au zungumza na mtu unayemwamini." })}</p>}</div>
      <div className="flex flex-wrap gap-3">
        <Button asChild><Link to="/guide" search={category ? { c: category.id } : {}}><ArrowRight className="size-4" />{t({ en: "Matching safety guide", sw: "Mwongozo wa usalama" })}</Link></Button>
        <Button asChild variant="secondary"><Link to="/directory" search={{ cat: category?.referTo[0] }}><LifeBuoy className="size-4" />{t({ en: "Get support", sw: "Pata msaada" })}</Link></Button>
        <Button asChild variant="outline"><Link to="/report"><FileWarning className="size-4" />{t({ en: "Report this case", sw: "Ripoti tukio hili" })}</Link></Button>
      </div>
      <p className="text-xs text-muted-foreground">{t({ en: "Nothing is reported automatically. Your checked text is not transferred to the report form.", sw: "Hakuna kinachoripotiwa kiotomatiki. Maandishi uliyokagua hayahamishwi kwenye fomu ya ripoti." })}</p>
    </section>}
  </div>;
}