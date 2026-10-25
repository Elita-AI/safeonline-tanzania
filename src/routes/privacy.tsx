import { createFileRoute } from "@tanstack/react-router";
import { useLang, ui } from "@/lib/i18n";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy & Safeguarding — SafeOnline" },
      { name: "description", content: "How SafeOnline protects your privacy: no registration, no stored chats, and reports stored only with your clear consent." },
      { property: "og:title", content: "Privacy & Safeguarding — SafeOnline" },
      { property: "og:description", content: "No registration, no stored chats, no third-party tracking." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Privacy,
});

const sections = [
  { h: { en: "Message checks & images", sw: "Ukaguzi wa jumbe na picha" }, p: { en: "Message checks run on this device with limited demonstration rules, not live AI. Text is not saved. Only if you tap ‘Ask AI for a deeper check’ is that text (never a picture) sent to an AI service for analysis; SafeOnline does not store it. Pasted links and usernames are treated only as text, never opened or verified. Screenshots can be read on this device to copy their words; the picture is never sent or saved. Never send intimate images. Checks do not automatically submit reports.", sw: "Ukaguzi wa jumbe hufanyika kwenye kifaa hiki kwa kanuni chache za majaribio, si AI halisi. Maandishi hayahifadhiwi. Ukibonyeza tu ‘Omba AI ikague kwa kina’, maandishi hayo (kamwe si picha) yanatumwa kwa huduma ya AI kuchambuliwa; SafeOnline haiyahifadhi. Viungo na majina ya watumiaji hutumiwa kama maandishi pekee, hayafunguliwi wala kuthibitishwa. Picha za skrini zinaweza kusomwa kwenye kifaa hiki kunakili maneno; picha haitumwi wala kuhifadhiwa. Usitume picha za faragha kamwe. Ukaguzi hautumi ripoti kiotomatiki." } },
  { h: { en: "Reports", sw: "Ripoti" }, p: { en: "If you send a report from the Report a Problem page, we store what you write — the problem type, your description, and the optional region and contact details you choose to give. Reports are visible only to the SafeOnline team, are never published, and are kept only so the team can review them and follow up if you asked.", sw: "Ukituma ripoti kutoka ukurasa wa Ripoti Tatizo, tunahifadhi uliyoandika — aina ya tatizo, maelezo yako, na maelezo ya hiari ya mkoa au mawasiliano uliyochagua kutoa. Ripoti zinaonekana na timu ya SafeOnline pekee, hazichapishwi kamwe, na zinahifadhiwa ili timu izikague na zifuate nawe ukiomba." } },
  { h: { en: "What we collect", sw: "Tunachokusanya" }, p: { en: "Nothing that identifies you is required. No registration, no images, and no precise locations are requested. Your language choice is remembered on this device, and reports are stored only if you choose to send one.", sw: "Hakuna kinachokutambulisha kinachohitajika. Hatuombi usajili, picha, wala mahali halisi ulipo. Lugha uliyochagua hukumbukwa kwenye kifaa hiki, na ripoti zinahifadhiwa tu ukituma wewe mwenyewe." } },
  { h: { en: "Chats", sw: "Mazungumzo" }, p: { en: "Chats are not stored. In this demonstration, messages never leave your device — responses come from pre-written, reviewed scenarios. If a live AI service is added later, you will be told clearly before chatting that an AI provider processes your messages.", sw: "Mazungumzo hayahifadhiwi. Katika toleo hili la majaribio, jumbe haziondoki kwenye kifaa chako — majibu yanatoka kwenye hali zilizoandaliwa na kukaguliwa. Huduma ya AI ikiongezwa baadaye, utaambiwa wazi kabla ya kuanza kuwa mtoa huduma wa AI huchakata jumbe zako." } },
  { h: { en: "Tracking & analytics", sw: "Ufuatiliaji na takwimu" }, p: { en: "No third-party tracking or analytics. Future versions may count aggregate, anonymous figures (e.g. number of guides viewed) only with clear consent.", sw: "Hakuna ufuatiliaji wa watu wengine wala takwimu. Matoleo yajayo yanaweza kuhesabu takwimu za jumla bila majina (k.m. idadi ya miongozo iliyosomwa) kwa ridhaa ya wazi tu." } },
  { h: { en: "Quick Exit", sw: "Ondoka Haraka" }, p: ui.quickExitNote },
  { h: { en: "Under 18?", sw: "Chini ya miaka 18?" }, p: { en: "You can use SafeOnline without sharing any personal details. If someone is harming or pressuring you, please talk to a trusted adult or a child helpline. None of this is your fault.", sw: "Unaweza kutumia SafeOnline bila kutoa taarifa zako binafsi. Mtu akikudhuru au kukushinikiza, tafadhali zungumza na mtu mzima unayemwamini au simu ya msaada kwa watoto. Hakuna kati ya haya ni kosa lako." } },
  { h: { en: "Limits", sw: "Mipaka" }, p: { en: "SafeOnline gives general guidance only. It does not diagnose, give legal advice, promise confidentiality or guarantee safety, and never contacts authorities on your behalf.", sw: "SafeOnline hutoa mwongozo wa jumla tu. Haitoi utambuzi, ushauri wa kisheria, haiahidi usiri kamili wala usalama, na kamwe haiwasiliani na mamlaka kwa niaba yako." } },
];

function Privacy() {
  const { t } = useLang();
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-4xl text-primary">{t({ en: "Privacy & Safeguarding", sw: "Faragha na Ulinzi" })}</h1>
      <div className="mt-8 space-y-4">
        {sections.map((s) => (
          <section key={s.h.en} className="rounded-2xl border bg-card p-5">
            <h2 className="font-semibold text-lg">{t(s.h)}</h2>
            <p className="text-muted-foreground mt-1">{t(s.p)}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
