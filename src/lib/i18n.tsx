import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "sw";
export type T = { en: string; sw: string };

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "en",
  setLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    // Only the language preference is stored — never any conversation data.
    const saved = window.localStorage.getItem("safeonline-lang");
    if (saved === "sw" || saved === "en") setLangState(saved);
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("safeonline-lang", l);
    document.documentElement.lang = l;
  };
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export function useLang() {
  const { lang, setLang } = useContext(Ctx);
  const t = (s: T) => s[lang];
  return { lang, setLang, t };
}

export const ui = {
  navHome: { en: "Home", sw: "Mwanzo" },
  navCheck: { en: "Check a Message", sw: "Kagua Ujumbe" },
  navChat: { en: "Let's chat 24/7", sw: "Tuongee 24/7" },
  aiNoteLead: { en: "AI assistant, not a human. In danger? Call", sw: "Msaidizi wa AI, si binadamu. Uko hatarini? Piga" },
  aiNoteLink: { en: "Support numbers", sw: "Namba za Msaada" },
  navGuide: { en: "Cyberthreats & Safety Tips", sw: "Vitisho vya Mtandaoni na Vidokezo vya Usalama" },
  navLaw: { en: "Know the Law", sw: "Fahamu Sheria" },
  navDirectory: { en: "Support Services", sw: "Huduma za Msaada" },
  navReport: { en: "Report a Problem", sw: "Ripoti Tatizo" },
  navPrivacy: { en: "Privacy", sw: "Faragha" },
  tagline: { en: "Safe Online. Supported Offline.", sw: "Salama Mtandaoni. Unasaidiwa Nje ya Mtandao." },
  emergency: {
    en: "In immediate danger? Move somewhere safer if you can and seek help from a trusted person or local emergency service you know. SafeOnline cannot send emergency help.",
    sw: "Uko hatarini sasa hivi? Nenda mahali salama zaidi ukiweza na tafuta msaada wa mtu unayemwamini au huduma ya dharura unayoijua. SafeOnline haiwezi kutuma msaada wa dharura.",
  },
  toVerify: { en: "to be verified before launch", sw: "inahitaji kuthibitishwa kabla ya kuzinduliwa" },
  demo: { en: "Demo", sw: "Majaribio" },
  helpful: { en: "Was this guidance helpful?", sw: "Je, mwongozo huu umekusaidia?" },
  yes: { en: "Yes", sw: "Ndiyo" },
  no: { en: "Not really", sw: "Si sana" },
  thanks: {
    en: "Thank you. Your answer is not stored in this demo and contains no personal details.",
    sw: "Asante. Jibu lako halihifadhiwi katika toleo hili la majaribio na halina taarifa binafsi.",
  },
} satisfies Record<string, T>;
