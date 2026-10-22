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
    const saved = window.localStorage.getItem("safeher-lang");
    if (saved === "sw" || saved === "en") setLangState(saved);
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("safeher-lang", l);
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
  navChat: { en: "Talk to SafeHer", sw: "Ongea na SafeHer" },
  navGuide: { en: "Safety Guide", sw: "Mwongozo wa Usalama" },
  navDirectory: { en: "Support Services", sw: "Huduma za Msaada" },
  navReport: { en: "Report a Problem", sw: "Ripoti Tatizo" },
  navPrivacy: { en: "Privacy", sw: "Faragha" },
  quickExit: { en: "Quick Exit", sw: "Ondoka Haraka" },
  quickExitNote: {
    en: "Quick Exit opens a neutral website. It cannot erase your browser history, notifications, network logs, or monitoring by another person.",
    sw: "Ondoka Haraka hufungua tovuti ya kawaida. Haiwezi kufuta historia ya kivinjari, arifa, kumbukumbu za mtandao, au ufuatiliaji wa mtu mwingine.",
  },
  prototype: {
    en: "Prototype for demonstration — not clinically validated, legally certified, or ready for public deployment.",
    sw: "Mfano wa majaribio — haujathibitishwa kitabibu wala kisheria, na bado si tayari kutumika hadharani.",
  },
  tagline: { en: "Safe Online. Supported Offline.", sw: "Salama Mtandaoni. Unasaidiwa Nje ya Mtandao." },
  emergency: {
    en: "In immediate danger? Move to a safe place and call the Police emergency line 112.",
    sw: "Uko hatarini sasa hivi? Nenda mahali salama na piga simu ya dharura ya Polisi 112.",
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
