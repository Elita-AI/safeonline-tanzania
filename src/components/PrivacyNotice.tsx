import { Link } from "@tanstack/react-router";
import { LockKeyhole } from "lucide-react";
import { useLang } from "@/lib/i18n";

export function PrivacyNotice() {
  const { t } = useLang();
  return <aside className="border-l-4 border-primary bg-secondary p-4 flex gap-3 items-start">
    <LockKeyhole className="size-5 shrink-0 text-primary mt-0.5" aria-hidden />
    <div className="text-sm">
      <p className="font-semibold">{t({ en: "Your privacy comes first", sw: "Faragha yako ni kipaumbele" })}</p>
      <p className="mt-1">{t({ en: "Submitting a message check or chat sends text to an AI service. SafeOnline does not save it. Screenshots are read only on your device; pictures are never sent or saved. Links are never opened. No names or intimate images. Only a report you choose to submit with consent is stored for the SafeOnline team. Quick Exit does not erase browser history or monitoring.", sw: "Ukituma ujumbe kukaguliwa au kwenye mazungumzo, maandishi yanatumwa kwa huduma ya AI. SafeOnline haiyahifadhi. Picha za skrini zinasomwa kwenye kifaa chako pekee; picha hazitumwi wala kuhifadhiwa. Viungo havifunguliwi kamwe. Usitume majina au picha za faragha. Ripoti unayochagua kutuma kwa ridhaa pekee huhifadhiwa kwa timu ya SafeOnline. Ondoka Haraka haifuti historia ya kivinjari au ufuatiliaji." })} <Link to="/privacy" className="underline font-semibold text-primary">{t({ en: "Privacy details", sw: "Maelezo ya faragha" })}</Link></p>
    </div>
  </aside>;
}