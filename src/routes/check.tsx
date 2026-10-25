import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ScanText, RotateCcw, ArrowRight, LifeBuoy, FileWarning, Home, ImageOff, ImagePlus, Sparkles } from "lucide-react";
import { assessText, assessmentLabels, categories, generalGuidance } from "@/lib/content";
import { deepCheck, type DeepCheckResult } from "@/lib/deep-check.functions";
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
  const { t, lang } = useLang();
  const [text, setText] = useState("");
  const [result, setResult] = useState<ReturnType<typeof assessText> | null>(null);
  const [reading, setReading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ocrMsg, setOcrMsg] = useState<{ en: string; sw: string } | null>(null);
  const [checkedText, setCheckedText] = useState("");
  const [deep, setDeep] = useState<DeepCheckResult | null>(null);
  const [deepLoading, setDeepLoading] = useState(false);
  const [deepErr, setDeepErr] = useState<{ en: string; sw: string } | null>(null);
  const deepFn = useServerFn(deepCheck);
  async function runDeep() {
    setDeepLoading(true); setDeepErr(null); setDeep(null);
    try {
      const r = await deepFn({ data: { text: checkedText, lang } });
      if ("error" in r) setDeepErr(r.error === "busy" ? { en: "AI is busy. Please try again in a minute.", sw: "AI ina shughuli nyingi. Jaribu tena baada ya dakika moja." } : r.error === "credits" ? { en: "The AI check is unavailable right now.", sw: "Ukaguzi wa AI haupatikani kwa sasa." } : { en: "The AI check failed. Please use the steps above.", sw: "Ukaguzi wa AI umeshindwa. Tafadhali tumia hatua zilizo juu." });
      else setDeep(r);
    } catch { setDeepErr({ en: "The AI check failed. Please use the steps above.", sw: "Ukaguzi wa AI umeshindwa. Tafadhali tumia hatua zilizo juu." }); }
    finally { setDeepLoading(false); }
  }
  async function readImage(file: File) {
    if (file.size > 10 * 1024 * 1024) { setOcrMsg({ en: "Image is too large (max 10 MB).", sw: "Picha ni kubwa mno (kiwango cha juu MB 10)." }); return; }
    setReading(true); setProgress(0); setOcrMsg(null); setResult(null);
    try {
      const { createWorker } = await import("tesseract.js");
      const worker = await createWorker(["eng", "swa"], 1, { logger: (m) => { if (m.status === "recognizing text") setProgress(Math.round(m.progress * 100)); } });
      const { data } = await worker.recognize(file);
      await worker.terminate();
      const words = data.text.replace(/\n{3,}/g, "\n\n").trim().slice(0, 4000);
      if (words) { setText(words); setOcrMsg({ en: "Words copied into the box. Remove names or personal details, then press Check text. The picture was not saved.", sw: "Maneno yamewekwa kwenye kisanduku. Ondoa majina au taarifa binafsi, kisha bonyeza Kagua maandishi. Picha haikuhifadhiwa." }); }
      else setOcrMsg({ en: "No readable words found. Try a clearer screenshot or type the message.", sw: "Hakuna maneno yaliyosomeka. Jaribu picha iliyo wazi zaidi au andika ujumbe." });
    } catch {
      setOcrMsg({ en: "Could not read this image. Please type the message instead.", sw: "Imeshindwa kusoma picha hii. Tafadhali andika ujumbe badala yake." });
    } finally { setReading(false); }
  }
  const category = categories.find((item) => item.id === result?.category);
  return <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
    <div className="flex items-start gap-3">
      <ScanText className="size-8 text-primary shrink-0 mt-1" aria-hidden />
      <h1 className="font-display text-3xl text-primary mr-auto">{t({ en: "Check a Message", sw: "Kagua Ujumbe" })}</h1>
      <Button asChild variant="outline" size="icon" title={t({ en: "Main menu", sw: "Menyu kuu" })}><Link to="/" aria-label={t({ en: "Main menu", sw: "Menyu kuu" })}><Home className="size-4" /></Link></Button>
    </div>
    <PrivacyNotice />
    <p className="text-sm bg-coral-soft p-3 rounded-lg">{t({ en: "Demonstration assessment, not a legal determination. The first check runs on this device and matches a limited set of safety signals and can miss slang, mixed-language meaning or context. It cannot verify a link or username.", sw: "Tathmini ya majaribio, si uamuzi wa kisheria. Ukaguzi wa kwanza unafanyika kwenye kifaa hiki na hutambua dalili chache za usalama na unaweza kukosa misimu, maana ya lugha mchanganyiko au muktadha. Hauwezi kuthibitisha kiungo au jina la mtumiaji." })}</p>
    <form onSubmit={(event) => { event.preventDefault(); if (text.trim()) { setResult(assessText(text)); setCheckedText(text.trim()); setDeep(null); setDeepErr(null); setText(""); } }} className="space-y-3">
      <label htmlFor="check-text" className="block font-semibold">{t({ en: "Message, link or username", sw: "Ujumbe, kiungo au jina la mtumiaji" })}</label>
      <Textarea id="check-text" value={text} onChange={(event) => { setText(event.target.value); setResult(null); }} maxLength={4000} rows={5} className="resize-y" placeholder={t({ en: "Paste text only — remove names and personal details…", sw: "Bandika maandishi pekee — ondoa majina na taarifa binafsi…" })} />
      <div className="border border-dashed rounded-lg p-4 space-y-2">
        <p className="font-semibold text-sm">{t({ en: "Or read the words from a screenshot", sw: "Au soma maneno kutoka picha ya skrini" })}</p>
        <div className="flex items-start gap-2 text-sm text-muted-foreground"><ImageOff className="size-4 shrink-0 mt-0.5" /><p>{t({ en: "Only use screenshots of messages — never intimate images. The picture is read on this device, never sent or saved. Only the words are copied into the box above so you can check and edit them; it cannot describe what a photo shows.", sw: "Tumia picha za skrini za jumbe pekee — kamwe si picha za faragha. Picha inasomwa kwenye kifaa hiki, haitumwi wala kuhifadhiwa. Maneno pekee yanawekwa kwenye kisanduku hapo juu ili uyakague na kuyahariri; haiwezi kueleza picha inaonyesha nini." })}</p></div>
        <label className="inline-flex items-center gap-2 cursor-pointer rounded-md border bg-background px-3 py-2 text-sm font-medium hover:bg-secondary">
          <ImagePlus className="size-4" />{reading ? t({ en: `Reading… ${progress}%`, sw: `Inasoma… ${progress}%` }) : t({ en: "Choose screenshot", sw: "Chagua picha ya skrini" })}
          <input type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" disabled={reading} onChange={(event) => { const file = event.target.files?.[0]; event.target.value = ""; if (file) void readImage(file); }} />
        </label>
        {ocrMsg && <p className="text-sm" role="status">{t(ocrMsg)}</p>}
      </div>
      <Button type="submit" disabled={!text.trim()}><ScanText className="size-4" />{t({ en: "Check text", sw: "Kagua maandishi" })}</Button>
    </form>
    {result && <section className="border-t pt-6 space-y-5" aria-live="polite">
      <div className="flex flex-wrap gap-3 items-center"><h2 className="font-display text-2xl text-primary mr-auto">{t({ en: "Assessment", sw: "Tathmini" })}</h2><Button variant="ghost" size="sm" onClick={() => setResult(null)}><RotateCcw className="size-4" />{t({ en: "Clear", sw: "Futa" })}</Button></div>
      <p className="text-sm font-semibold">{t({ en: "Demonstration assessment, not a legal determination", sw: "Tathmini ya majaribio, si uamuzi wa kisheria" })}</p>
      {result.immediateDanger && <EmergencyNotice />}
      <div className="border rounded-lg p-4"><p className="text-sm text-muted-foreground">{t({ en: "Likely category", sw: "Aina inayowezekana" })}</p><p className="font-semibold mt-1">{result.category ? t(assessmentLabels[result.category]) : t({ en: "Unclear", sw: "Haijabainika" })}</p></div>

      <p>{t(result.reason)}</p>
      <div><h3 className="font-semibold">{t({ en: "Warning signs found", sw: "Dalili zilizotambuliwa" })}</h3>{result.warnings.length ? <ul className="list-disc pl-5 mt-2 space-y-1">{result.warnings.map((warning) => <li key={warning.en}>{t(warning)}</li>)}</ul> : <p className="text-sm mt-2">{t({ en: "None matched. This does not establish safety.", sw: "Hakuna zilizotambuliwa. Hii haithibitishi usalama." })}</p>}</div>
      {result.found.length > 0 && <div><h3 className="font-semibold">{t({ en: "Words that raised concern", sw: "Maneno yaliyoleta wasiwasi" })}</h3><div className="flex flex-wrap gap-2 mt-2">{result.found.map((w) => <span key={w} className="rounded-full bg-coral-soft px-3 py-1 text-sm font-medium">{w}</span>)}</div>{result.category === "bullying" && <p className="text-sm mt-2">{t({ en: "Mocking someone's body or appearance, or comparing them to others to shame them, is a form of cyberbullying.", sw: "Kudhihaki mwili au sura ya mtu, au kumlinganisha na wengine ili kumdhalilisha, ni aina ya unyanyasaji mtandaoni." })}</p>}</div>}
      <p className="bg-secondary p-4 text-sm">{t({ en: "Confidence is limited. This tool can be wrong and cannot establish intent, identity or legality. If you feel unsafe or uncertain, seek human help even when the risk looks lower.", sw: "Uhakika ni mdogo. Zana hii inaweza kukosea na haiwezi kuthibitisha nia, utambulisho au uhalali. Ukihisi si salama au una mashaka, tafuta msaada wa mtu hata ikiwa hatari inaonekana ndogo." })}</p>
      <div className="rounded-lg border-2 border-primary/30 p-4"><h3 className="font-display text-xl text-primary">{t({ en: "What to do next", sw: "Ufanye nini sasa" })}</h3>{category ? <><ol className="list-decimal pl-5 mt-2 space-y-2">{category.steps.map((step) => <li key={step.en}>{t(step)}</li>)}</ol><h4 className="font-semibold mt-4">{t({ en: "Save evidence safely", sw: "Hifadhi ushahidi kwa usalama" })}</h4><ul className="list-disc pl-5 mt-2 space-y-1">{category.evidence.map((e) => <li key={e.en}>{t(e)}</li>)}</ul></> : <ol className="list-decimal pl-5 mt-2 space-y-2">{generalGuidance.map((g) => <li key={g.en}>{t(g)}</li>)}</ol>}</div>
      <div className="rounded-lg bg-secondary p-4 space-y-3">
        <p className="font-semibold">{t({ en: "Want a deeper look?", sw: "Unataka ukaguzi wa kina zaidi?" })}</p>
        <p className="text-sm">{t({ en: "AI can understand slang, sarcasm and mixed language better. If you tap the button, the checked text (not any picture) is sent securely to an AI service to analyse. It is not saved by SafeOnline. Remove names first. AI can be wrong; this is not a legal judgement.", sw: "AI inaweza kuelewa misimu, kejeli na lugha mchanganyiko vizuri zaidi. Ukibonyeza kitufe, maandishi uliyokagua (si picha) yanatumwa kwa usalama kwa huduma ya AI kuchambuliwa. SafeOnline haiyahifadhi. Ondoa majina kwanza. AI inaweza kukosea; huu si uamuzi wa kisheria." })}</p>
        <Button onClick={runDeep} disabled={deepLoading || !checkedText}><Sparkles className="size-4" />{deepLoading ? t({ en: "Checking…", sw: "Inakagua…" }) : t({ en: "Ask AI for a deeper check", sw: "Omba AI ikague kwa kina" })}</Button>
        {deepErr && <p className="text-sm text-destructive" role="alert">{t(deepErr)}</p>}
        {deep && <div className="space-y-3 border-t pt-3" aria-live="polite">
          <p className="text-sm font-semibold">{t({ en: "AI-assisted assessment, not a legal determination", sw: "Tathmini kwa msaada wa AI, si uamuzi wa kisheria" })}</p>
          {deep.immediateDanger && <EmergencyNotice />}
          <p><span className="text-muted-foreground text-sm">{t({ en: "Category: ", sw: "Aina: " })}</span><strong>{deep.category === "unclear" ? t({ en: "Unclear", sw: "Haijabainika" }) : t(assessmentLabels[deep.category])}</strong> · <span className="text-muted-foreground text-sm">{t({ en: "Risk: ", sw: "Hatari: " })}</span><strong className={deep.risk === "High" ? "text-destructive" : "text-primary"}>{deep.risk === "High" ? t({ en: "High", sw: "Juu" }) : deep.risk === "Medium" ? t({ en: "Medium", sw: "Wastani" }) : t({ en: "Lower", sw: "Chini" })}</strong></p>
          <p>{deep.summary}</p>
          {deep.warningSigns.length > 0 && <ul className="list-disc pl-5 space-y-1">{deep.warningSigns.map((w) => <li key={w}>{w}</li>)}</ul>}
          <h4 className="font-semibold">{t({ en: "AI-suggested next steps", sw: "Hatua zinazopendekezwa na AI" })}</h4>
          <ol className="list-decimal pl-5 space-y-1">{deep.nextSteps.map((s) => <li key={s}>{s}</li>)}</ol>
        </div>}
      </div>
      <div className="flex flex-wrap gap-3">
        <Button asChild><Link to="/guide" search={category ? { c: category.id } : {}}><ArrowRight className="size-4" />{t({ en: "Matching safety guide", sw: "Mwongozo wa usalama" })}</Link></Button>
        <Button asChild variant="secondary"><Link to="/directory" search={{ cat: category?.referTo[0] }}><LifeBuoy className="size-4" />{t({ en: "Get support", sw: "Pata msaada" })}</Link></Button>
        <Button asChild variant="outline"><Link to="/report"><FileWarning className="size-4" />{t({ en: "Report this case", sw: "Ripoti tukio hili" })}</Link></Button>
      </div>
      <p className="text-xs text-muted-foreground">{t({ en: "Nothing is reported automatically. Your checked text is not transferred to the report form.", sw: "Hakuna kinachoripotiwa kiotomatiki. Maandishi uliyokagua hayahamishwi kwenye fomu ya ripoti." })}</p>
    </section>}
  </div>;
}