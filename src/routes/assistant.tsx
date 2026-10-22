import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send, ShieldCheck, Info, Home, Siren } from "lucide-react";
import { categories, detectCategory, detectDanger, serviceCategories, type Category } from "@/lib/content";
import { useLang, ui } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Feedback } from "@/components/SiteLayout";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "Talk to SafeHer — Safety Assistant" },
      { name: "description", content: "A bilingual, private safety assistant for online harassment and abuse (demonstration mode)." },
      { property: "og:title", content: "Talk to SafeHer" },
      { property: "og:description", content: "Describe what is happening in Kiswahili or English and get practical safety steps." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Assistant,
});

type Msg = { role: "user"; text: string } | { role: "bot"; kind: "intro" | "danger" | "unclear" } | { role: "bot"; kind: "guide"; cat: Category };

const scenarios = [
  { en: "Someone says they will post my photos unless I send money.", sw: "Mtu anasema atasambaza picha zangu nisipomtumia pesa." },
  { en: "Someone created a fake account using my name and photos.", sw: "Mtu ametengeneza akaunti bandia kwa jina na picha zangu." },
  { en: "I can't log into my Instagram and my password was changed.", sw: "Siwezi kuingia Instagram na nenosiri langu limebadilishwa." },
  { en: "People keep sending me insults in the comments every day.", sw: "Watu wananitukana kwenye maoni kila siku." },
];

function Assistant() {
  const { t, lang } = useLang();
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "bot", kind: "intro" }]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [msgs, typing]);

  const send = (value: string) => {
    const v = value.trim();
    if (!v || typing) return;
    setMsgs((m) => [...m, { role: "user", text: v }]);
    setText("");
    setTyping(true);
    setTimeout(() => {
      const reply: Msg[] = [];
      if (detectDanger(v)) reply.push({ role: "bot", kind: "danger" });
      const id = detectCategory(v);
      const cat = categories.find((c) => c.id === id);
      if (cat) reply.push({ role: "bot", kind: "guide", cat });
      else if (!reply.length) reply.push({ role: "bot", kind: "unclear" });
      setMsgs((m) => [...m, ...reply]);
      setTyping(false);
      inputRef.current?.focus();
    }, 700);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 flex flex-col min-h-[calc(100vh-8rem)]">
      <div className="flex items-center gap-3">
        <div className="size-11 rounded-2xl bg-primary text-primary-foreground grid place-items-center"><ShieldCheck /></div>
        <div className="mr-auto">
          <h1 className="font-display text-2xl text-primary leading-none">SafeHer</h1>
          <p className="text-xs text-muted-foreground mt-1">{t({ en: "Safety assistant", sw: "Msaidizi wa usalama" })}</p>
        </div>
        <Button asChild variant="outline" size="sm" className="rounded-full"><Link to="/"><Home className="size-4" /> {t({ en: "Main menu", sw: "Menyu kuu" })}</Link></Button>
      </div>

      <div className="mt-4 rounded-xl bg-coral-soft p-3 text-xs flex gap-2">
        <Info className="size-4 text-accent shrink-0 mt-0.5" />
        <span><b>{t({ en: "Demonstration mode", sw: "Hali ya majaribio" })}:</b> {t({ en: "No live AI is connected. Replies come from pre-written safety scenarios and your messages stay on this device. Nothing is saved.", sw: "Hakuna AI halisi iliyounganishwa. Majibu yanatoka kwenye hali za usalama zilizoandaliwa, na jumbe zako zinabaki kwenye kifaa hiki. Hakuna kinachohifadhiwa." })}</span>
      </div>

      <div className="flex-1 mt-4 space-y-4" aria-live="polite">
        {msgs.map((m, i) => m.role === "user" ? (
          <div key={i} className="flex justify-end"><p className="max-w-[85%] rounded-2xl rounded-br-md bg-primary text-primary-foreground px-4 py-2.5">{m.text}</p></div>
        ) : (
          <div key={i} className="max-w-[95%]">
            <BotMsg m={m} />
          </div>
        ))}
        {typing && <div className="flex gap-1 px-2 py-3" aria-label="typing">{[0, 1, 2].map((d) => <span key={d} className="size-2 rounded-full bg-turquoise animate-bounce" style={{ animationDelay: `${d * 120}ms` }} />)}</div>}
        {msgs.length === 1 && (
          <div className="grid sm:grid-cols-2 gap-2">
            {scenarios.map((s) => (
              <button key={s.en} onClick={() => send(s[lang])} className="text-left text-sm rounded-xl border bg-card p-3 hover:border-primary">
                <span className="text-[10px] font-bold uppercase text-accent block">{t({ en: "Sample scenario", sw: "Mfano wa hali" })}</span>{s[lang]}
              </button>
            ))}
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form onSubmit={(e) => { e.preventDefault(); send(text); }} className="sticky bottom-0 mt-4 bg-background pt-2 pb-3">
        <div className="flex gap-2 items-end rounded-2xl border bg-card p-2 shadow-soft">
          <Textarea ref={inputRef} value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(text); } }} rows={1} placeholder={t({ en: "Describe what's happening — no names or images needed…", sw: "Eleza kinachoendelea — huhitaji majina wala picha…" })} className="border-0 shadow-none resize-none focus-visible:ring-0 min-h-11" aria-label="Message" />
          <Button type="submit" size="icon" className="rounded-xl shrink-0" disabled={!text.trim() || typing} aria-label="Send"><Send className="size-4" /></Button>
        </div>
      </form>
    </div>
  );
}

function BotMsg({ m }: { m: Exclude<Msg, { role: "user" }> }) {
  const { t } = useLang();
  if (m.kind === "intro") return <p className="leading-relaxed">{t({ en: "Hello, I'm SafeHer. You can tell me what's happening online in Kiswahili or English — you don't need to share your name or any images. I'll suggest general steps and places to get support. Whatever is happening, it's not your fault.", sw: "Habari, mimi ni SafeHer. Unaweza kunieleza kinachoendelea mtandaoni kwa Kiswahili au Kiingereza — huhitaji kutaja jina lako wala kutuma picha. Nitapendekeza hatua za jumla na mahali pa kupata msaada. Chochote kinachotokea, si kosa lako." })}</p>;
  if (m.kind === "danger") return (
    <div className="rounded-2xl border-2 border-destructive bg-card p-4">
      <p className="font-semibold flex gap-2 items-center text-destructive"><Siren className="size-5" /> {t({ en: "Your safety comes first", sw: "Usalama wako ni wa kwanza" })}</p>
      <p className="mt-2">{t(ui.emergency)}</p>
      <a href="tel:112" className="inline-flex mt-3 rounded-full bg-destructive text-destructive-foreground px-4 py-2 font-semibold text-sm">112</a>
      <p className="text-xs text-muted-foreground mt-2">({t(ui.toVerify)})</p>
    </div>
  );
  if (m.kind !== "guide") return <p>{t({ en: "Thank you for telling me. I want to make sure I suggest the right steps. Is this mostly about: insults or harassment, threats, someone sharing or threatening to share images, a fake account, unwanted sexual messages, or a hacked account? You can also browse the Safety Guide.", sw: "Asante kwa kunieleza. Nataka kuhakikisha napendekeza hatua sahihi. Je, ni zaidi kuhusu: matusi au unyanyasaji, vitisho, mtu kusambaza au kutishia kusambaza picha, akaunti bandia, jumbe za ngono zisizotakiwa, au akaunti iliyodukuliwa? Unaweza pia kuangalia Mwongozo wa Usalama." })}</p>;
  const c = m.cat;
  return (
    <div className="space-y-3">
      <span className="text-[10px] font-bold uppercase tracking-wide rounded-full bg-coral-soft text-accent px-2 py-0.5">{t({ en: "Demo response · reviewed scenario", sw: "Jibu la majaribio · hali iliyokaguliwa" })}</span>
      <p>{t({ en: "I'm sorry this is happening — you did the right thing by reaching out. It sounds like this may relate to", sw: "Pole sana kwa yanayokutokea — umefanya vizuri kutafuta msaada. Inaonekana hili linaweza kuhusiana na" })} <b>{t(c.title).toLowerCase()}</b>. {t({ en: "This is a general category, not a legal determination.", sw: "Hii ni aina ya jumla, si uamuzi wa kisheria." })}</p>
      <ol className="list-decimal pl-5 space-y-1">{c.steps.map((s, i) => <li key={i}>{t(s)}</li>)}</ol>
      <p className="font-semibold">{t({ en: "Preserving evidence safely", sw: "Kuhifadhi ushahidi kwa usalama" })}</p>
      <ul className="list-disc pl-5 space-y-1">{c.evidence.map((s, i) => <li key={i}>{t(s)}</li>)}{c.platform.map((s, i) => <li key={`p${i}`}>{t(s)}</li>)}</ul>
      <div className="rounded-xl bg-secondary p-3 text-sm">
        {t({ en: "This is general guidance. A trained person — such as those listed under", sw: "Huu ni mwongozo wa jumla. Mtu aliyefunzwa — kama walioorodheshwa chini ya" })} <b>{c.referTo.map((r) => t(serviceCategories[r])).join(", ")}</b> — {t({ en: "can help with your specific situation.", sw: "anaweza kukusaidia kulingana na hali yako." })}
        <div className="flex flex-wrap gap-2 mt-3">
          <Link to="/directory" search={{ cat: c.referTo[0] }} className="rounded-full bg-primary text-primary-foreground px-4 py-1.5 font-semibold">{t({ en: "Find support", sw: "Tafuta msaada" })}</Link>
          <Link to="/guide" search={{ c: c.id }} className="rounded-full border bg-card px-4 py-1.5">{t({ en: "Open checklist", sw: "Fungua orodha" })}</Link>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{t({ en: "Is there anything else happening, such as feeling unsafe where you are? You can tell me in a few words.", sw: "Je, kuna jambo lingine linaloendelea, kama kujisikia si salama ulipo? Unaweza kunieleza kwa maneno machache." })}</p>
      <Feedback />
    </div>
  );
}
