import { Link } from "@tanstack/react-router";
import { LockKeyhole } from "lucide-react";
import { useLang } from "@/lib/i18n";

export function PrivacyNotice() {
  const { t } = useLang();
  return <aside className="border-l-4 border-primary bg-secondary p-4 flex gap-3 items-start">
    <LockKeyhole className="size-5 shrink-0 text-primary mt-0.5" aria-hidden />
    <div className="text-sm">
      <p className="font-semibold">{t({ en: "Your privacy comes first", sw: "Faragha yako ni kipaumbele" })}</p>
      <p className="mt-1">{t({ en: "No names or images needed. Checked text and chats are not saved. Quick Exit does not erase browser history.", sw: "Huhitaji kutoa jina au picha. Maandishi uliyokagua na mazungumzo hayahifadhiwi. Ondoka Haraka haifuti historia ya kivinjari." })} <Link to="/privacy" className="underline font-semibold text-primary">{t({ en: "Privacy details", sw: "Maelezo ya faragha" })}</Link></p>
    </div>
  </aside>;
}
