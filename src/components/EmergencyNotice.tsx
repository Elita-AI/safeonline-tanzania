import { Siren } from "lucide-react";
import { verifiedEmergencyServices } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function EmergencyNotice() {
  const { t } = useLang();
  const contacts = verifiedEmergencyServices();
  return <aside className="border-2 border-destructive rounded-lg bg-card p-4 space-y-3" role="alert">
    <h2 className="font-semibold text-destructive flex gap-2 items-center"><Siren className="size-5 shrink-0" />{t({ en: "Your safety comes first", sw: "Usalama wako ni wa kwanza" })}</h2>
    <p>{t({ en: "If you may be in immediate physical danger, move somewhere safer if you can, and seek help from a trusted person or local emergency service you know. Do not confront the person. Do not delay getting help to collect evidence. SafeOnline cannot send emergency help.", sw: "Ikiwa huenda uko hatarini kimwili sasa, nenda mahali salama zaidi ukiweza, na tafuta msaada wa mtu unayemwamini au huduma ya dharura unayoijua. Usimkabili mtu huyo. Usicheleweshe kutafuta msaada ili kukusanya ushahidi. SafeOnline haiwezi kutuma msaada wa dharura." })}</p>
    {contacts.length ? contacts.map((contact) => <div key={contact.id}>
      <p className="font-semibold">{t(contact.name)}</p>
      {contact.contacts?.length ? <ul className="mt-2 space-y-1.5">{contact.contacts.map((c) => <li key={c.phone} className="flex items-center justify-between gap-3 text-sm"><span className="text-muted-foreground">{c.label}</span><Button asChild size="sm" variant="destructive"><a href={`tel:${c.phone.replace(/\s/g, "")}`}>{c.phone}</a></Button></li>)}</ul> : null}
      {contact.phones.map((p) => <Button key={p} asChild variant="destructive"><a href={`tel:${p}`}>{p}</a></Button>)}
      {contact.link && <Button asChild variant="outline"><a href={contact.link} target="_blank" rel="noreferrer">{t({ en: "Emergency service", sw: "Huduma ya dharura" })}</a></Button>}
    </div>) : <p className="text-sm text-muted-foreground">{t({ en: "No emergency contacts have been verified in this demonstration. Unverified numbers are not shown here.", sw: "Hakuna mawasiliano ya dharura yaliyothibitishwa katika toleo hili la majaribio. Namba zisizothibitishwa hazionyeshwi hapa." })}</p>}
  </aside>;
}
