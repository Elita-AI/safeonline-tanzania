import { createFileRoute, Link } from "@tanstack/react-router";
import { PageImage } from "@/components/PageImage";
import checkImg from "@/assets/check_message.jpg";
import { useState, useRef } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Phone, MessageSquare, ScanText, RotateCcw, ArrowRight, LifeBuoy, FileWarning, Home, ImagePlus, Sparkles } from "lucide-react";
import { assessText, assessmentLabels, categories, lawForCategory, services } from "@/lib/content";
import { deepCheck, type DeepCheckResult } from "@/lib/deep-check.functions";
import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PrivacyNotice } from "@/components/PrivacyNotice";
import { EmergencyNotice } from "@/components/EmergencyNotice";

export const Route = createFileRoute("/check")({
  head: () => ({ meta: [
    { title: "Check a Message — SafeOnline" },
    { name: "description", content: "AI-assisted message checks in English or Kiswahili with practical next steps. Links are never visited and text is not stored." },
    { property: "og:title", content: "Check a Message — SafeOnline" },
    { property: "og:description", content: "AI-assisted text assessments and next steps in English and Kiswahili; screenshots stay on your device." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: CheckPage,
});

export function CheckPage() {
  const { t, lang } = useLang();
  const [text, setText] = useState("");
  const [result, setResult] = useState<ReturnType<typeof assessText> | null>(null);
  const [reading, setReading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ocrMsg, setOcrMsg] = useState<{ en: string; sw: string } | null>(null);
  const requestId = useRef(0);
  const [deep, setDeep] = useState<DeepCheckResult | null>(null);
  const [deepLoading, setDeepLoading] = useState(false);
  const [deepErr, setDeepErr] = useState<{ en: string; sw: string } | null>(null);
  const deepFn = useServerFn(deepCheck);
  async function runDeep() {
    const submittedText = text.trim();
    if (!submittedText || reading || deepLoading) return;
    const id = ++requestId.current;
    setResult(assessText(submittedText));
    setDeepLoading(true); setDeepErr(null); setDeep(null);
    try {
      const r = await deepFn({ data: { text: submittedText, lang } });
      if (id !== requestId.current) return;
      if ("error" in r) setDeepErr(r.error === "busy" ? { en: "AI is busy. Please try again in a minute.", sw: "AI ina shughuli nyingi. Jaribu tena baada ya dakika moja." } : r.error === "credits" ? { en: "The AI check is unavailable right now. You can still use the safety guide or get support.", sw: "Ukaguzi wa AI haupatikani kwa sasa. Unaweza kutumia mwongozo wa usalama au kupata msaada." } : { en: "The AI check failed. Try again or use the safety guide below.", sw: "Ukaguzi wa AI umeshindwa. Jaribu tena au tumia mwongozo wa usalama hapa chini." });
      else setDeep(r);
    } catch {
      if (id === requestId.current) setDeepErr({ en: "The AI check failed. Try again or use the safety guide below.", sw: "Ukaguzi wa AI umeshindwa. Jaribu tena au tumia mwongozo wa usalama hapa chini." });
    } finally { if (id === requestId.current) setDeepLoading(false); }
  }
  function clearAssessment() {
    requestId.current += 1;
    setResult(null); setDeep(null); setDeepErr(null); setDeepLoading(false);
  }
  async function readImage(file: File) {
    if (file.size > 10 * 1024 * 1024) { setOcrMsg({ en: "Image is too large (max 10 MB).", sw: "Picha ni kubwa mno (kiwango cha juu MB 10)." }); return; }
    setReading(true); setProgress(0); setOcrMsg(null); clearAssessment();
    try {
      const { createWorker } = await import("tesseract.js");
      const worker = await createWorker(["eng", "swa"], 1, { logger: (m) => { if (m.status === "recognizing text") setProgress(Math.round(m.progress * 100)); } });
      const { data } = await worker.recognize(file);
      await worker.terminate();
      const words = data.text.replace(/\n{3,}/g, "\n\n").trim().slice(0, 4000);
      if (words) { setText(words); setOcrMsg({ en: "Words copied into the box. Remove names, then press Check text.", sw: "Maneno yamewekwa kwenye kisanduku. Ondoa majina, kisha bonyeza Kagua maandishi." }); }
      else setOcrMsg({ en: "No readable words found. Try a clearer screenshot or type the message.", sw: "Hakuna maneno yaliyosomeka. Jaribu picha iliyo wazi zaidi au andika ujumbe." });
    } catch {
      setOcrMsg({ en: "Could not read this image. Please type the message instead.", sw: "Imeshindwa kusoma picha hii. Tafadhali andika ujumbe badala yake." });
    } finally { setReading(false); }
  }
  const category = categories.find((item) => item.id === deep?.category);
  return <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
    <div className="flex items-start gap-3">
      <ScanText className="size-8 text-primary shrink-0 mt-1" aria-hidden />
      <h1 className="font-display text-3xl text-primary mr-auto">{t({ en: "Check a Message", sw: "Kagua Ujumbe" })}</h1>
      <Button asChild variant="outline" size="icon" title={t({ en: "Main menu", sw: "Menyu kuu" })}><Link to="/" aria-label={t({ en: "Main menu", sw: "Menyu kuu" })}><Home className="size-4" /></Link></Button>
    </div>
    <PageImage src={checkImg} alt={t({ en: "A woman carefully reading a message on her phone", sw: "Mwanamke akisoma ujumbe kwa makini kwenye simu" })} />
    <PrivacyNotice />
    <form onSubmit={(event) => { event.preventDefault(); void runDeep(); }} className="space-y-3">
      <label htmlFor="check-text" className="block font-semibold">{t({ en: "Message, link or username", sw: "Ujumbe, kiungo au jina la mtumiaji" })}</label>
      <Textarea id="check-text" value={text} disabled={deepLoading || reading} onChange={(event) => { setText(event.target.value); clearAssessment(); }} maxLength={4000} rows={5} className="resize-y" placeholder={t({ en: "Paste text only — remove names and personal details…", sw: "Bandika maandishi pekee — ondoa majina na taarifa binafsi…" })} />
      <div className="border border-dashed rounded-lg p-4 space-y-2">
        <p className="font-semibold text-sm">{t({ en: "Or read the words from a screenshot", sw: "Au soma maneno kutoka picha ya skrini" })}</p>
        <label className="inline-flex items-center gap-2 cursor-pointer rounded-md border bg-background px-3 py-2 text-sm font-medium hover:bg-secondary">
          <ImagePlus className="size-4" />{reading ? t({ en: `Reading… ${progress}%`, sw: `Inasoma… ${progress}%` }) : t({ en: "Upload screenshot", sw: "Pakia picha ya skrini" })}
          <input type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" disabled={reading || deepLoading} onChange={(event) => { const file = event.target.files?.[0]; event.target.value = ""; if (file) void readImage(file); }} />
        </label>
        {ocrMsg && <p className="text-sm" role="status">{t(ocrMsg)}</p>}
      </div>
      <p className="text-sm text-muted-foreground">{t({ en: "Pressing Check text sends the text to AI for assessment and next steps. SafeOnline does not save it. AI can make mistakes.", sw: "Ukibonyeza Kagua maandishi, maandishi yanatumwa kwa AI kwa tathmini na hatua zinazofuata. SafeOnline hayahifadhi. AI inaweza kukosea." })}</p>
      <Button type="submit" disabled={!text.trim() || reading || deepLoading}><Sparkles className="size-4" />{deepLoading ? t({ en: "Checking…", sw: "Inakagua…" }) : t({ en: "Check text", sw: "Kagua maandishi" })}</Button>
    </form>
    {(result || deep || deepErr || deepLoading) && <section className="border-t pt-6 space-y-5" aria-live="polite" aria-busy={deepLoading}>
      <div className="flex flex-wrap gap-3 items-center"><h2 className="font-display text-2xl text-primary mr-auto">{t({ en: "Assessment", sw: "Tathmini" })}</h2><Button variant="ghost" size="sm" onClick={clearAssessment}><RotateCcw className="size-4" />{t({ en: "Clear", sw: "Futa" })}</Button></div>
      {(result?.immediateDanger || deep?.immediateDanger) && <EmergencyNotice />}
      {deepLoading && <p role="status">{t({ en: "AI is checking your message…", sw: "AI inakagua ujumbe wako…" })}</p>}
      {deepErr && <p className="text-sm text-destructive" role="alert">{t(deepErr)}</p>}
      {deep && <>
        <p className="text-sm font-semibold">{t({ en: "AI-assisted assessment, not a legal determination", sw: "Tathmini kwa msaada wa AI, si uamuzi wa kisheria" })}</p>
        <div className="border rounded-lg p-4"><p className="text-sm text-muted-foreground">{t({ en: "Likely category", sw: "Aina inayowezekana" })}</p><p className="font-semibold mt-1">{deep.category === "unclear" ? t({ en: "No clear offence under the Cybercrimes Act", sw: "Hakuna kosa bayana chini ya Sheria ya Makosa ya Mtandao" }) : t(assessmentLabels[deep.category])}</p>
          {lawForCategory(deep.category).length > 0 && <div className="mt-3 space-y-3 border-t pt-3">
            <p className="text-sm font-semibold text-primary">{t({ en: "What the Cybercrimes Act, 2015 says", sw: "Sheria ya Makosa ya Mtandao, 2015 inasema nini" })}</p>
            {lawForCategory(deep.category).map((o) => <div key={o.heading.en} className="text-sm space-y-1">
              <p className="font-semibold">{t(o.heading)}</p>
              <p>{t(o.body)}</p>
              <p className="rounded-md bg-secondary px-3 py-2"><span className="font-semibold">{t({ en: "Possible penalty: ", sw: "Adhabu inayowezekana: " })}</span>{t(o.penalty)}</p>
            </div>)}
            <p className="text-xs text-muted-foreground">{t({ en: "General information, not legal advice. Only a court decides whether a crime happened.", sw: "Taarifa za jumla, si ushauri wa kisheria. Mahakama pekee ndiyo huamua kama kosa limetendeka." })} <Link to="/law" className="underline">{t({ en: "Know the Law", sw: "Fahamu Sheria" })}</Link></p>
          </div>}
        </div>
        <p>{deep.summary}</p>
        <div className="border-t pt-4"><h3 className="font-display text-xl text-primary">{t({ en: "What to do next", sw: "Ufanye nini sasa" })}</h3><ol className="list-decimal pl-5 mt-2 space-y-2">{deep.nextSteps.map((step) => <li key={step}>{step}</li>)}</ol>
          {category && <><h4 className="font-semibold mt-4">{t({ en: "Save evidence safely", sw: "Hifadhi ushahidi kwa usalama" })}</h4><ul className="list-disc pl-5 mt-2 space-y-1">{category.evidence.map((e) => <li key={e.en}>{t(e)}</li>)}</ul></>}
        </div>
      </>}
      {(deep || deepErr) && <QuickContacts />}
      <div className="flex flex-wrap gap-3">
        <Button asChild><Link to="/guide" search={category ? { c: category.id } : {}}><ArrowRight className="size-4" />{t({ en: "Matching safety guide", sw: "Mwongozo wa usalama" })}</Link></Button>
        <Button asChild variant="secondary"><Link to="/directory" search={{ cat: category?.referTo[0] }}><LifeBuoy className="size-4" />{t({ en: "Get support", sw: "Pata msaada" })}</Link></Button>
        <Button asChild variant="outline"><Link to="/report"><FileWarning className="size-4" />{t({ en: "Report this case", sw: "Ripoti tukio hili" })}</Link></Button>
      </div>
      <p className="text-xs text-muted-foreground">{t({ en: "Nothing is reported automatically. Your checked text is not transferred to the report form.", sw: "Hakuna kinachoripotiwa kiotomatiki. Maandishi uliyokagua hayahamishwi kwenye fomu ya ripoti." })}</p>
    </section>}
  </div>;
}
function QuickContacts() {
  const { t } = useLang();
  const verified = services.filter((s) => s.verified && !s.demo && s.lastVerified);
  const ministry = verified.find((s) => s.id === "ministry-gender");
  const police = verified.find((s) => s.id === "police-officers")?.contacts?.find((c) => c.label.startsWith("DCI"));
  const child = verified.find((s) => s.id === "child-116");
  const tcra = verified.find((s) => s.id === "tcra-15040");
  const items: { label: { en: string; sw: string }; value: string; href: string; sms?: boolean }[] = [];
  if (ministry?.phones[0]) items.push({ label: { en: "Ministry — GBV & child protection (WhatsApp/SMS)", sw: "Wizara — ukatili wa kijinsia na watoto (WhatsApp/SMS)" }, value: ministry.phones[0], href: `tel:${ministry.phones[0]}` });
  if (police) items.push({ label: { en: "Police — DCI (cybercrime)", sw: "Polisi — DCI (makosa ya mtandao)" }, value: police.phone, href: `tel:${police.phone.replace(/\s/g, "")}` });
  if (child?.phones[0]) items.push({ label: { en: "National Child Helpline", sw: "Simu ya Msaada kwa Mtoto" }, value: child.phones[0], href: `tel:${child.phones[0]}` });
  if (tcra?.sms?.[0]) items.push({ label: { en: "TCRA — report scammers (SMS)", sw: "TCRA — ripoti matapeli (SMS)" }, value: tcra.sms[0], href: `sms:${tcra.sms[0]}`, sms: true });
  if (!items.length) return null;
  return <div className="rounded-lg border-2 border-primary p-4 space-y-3">
    <h3 className="font-display text-xl text-primary">{t({ en: "Numbers you can contact now (free)", sw: "Namba unazoweza kuwasiliana nazo sasa (bure)" })}</h3>
    <ul className="grid gap-2 sm:grid-cols-2">{items.map((i) => <li key={i.href}><a href={i.href} className="flex items-center gap-2 rounded-md bg-secondary px-3 py-2 text-sm hover:opacity-80">{i.sms ? <MessageSquare className="size-4 shrink-0" /> : <Phone className="size-4 shrink-0" />}<span><span className="block font-semibold">{t(i.label)}</span>{i.sms ? t({ en: `Text ${i.value}`, sw: `Tuma SMS ${i.value}` }) : i.value}</span></a></li>)}</ul>
  </div>;
}
