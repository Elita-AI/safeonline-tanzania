import { createFileRoute, Link } from "@tanstack/react-router";
import { LifeBuoy, MessageCircle, MapPin, BookOpen, ScanText, ListChecks, HeartHandshake, ShieldCheck, FileWarning } from "lucide-react";
import { PrivacyNotice } from "@/components/PrivacyNotice";
import hero from "@/assets/hero.jpg";
import { useLang } from "@/lib/i18n";
import { categories } from "@/lib/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SafeOnline — Safe Online. Supported Offline." },
      { name: "description", content: "Bilingual digital safety guidance and support referrals for women and girls in Tanzania facing online abuse." },
      { property: "og:title", content: "SafeOnline" },
      { property: "og:description", content: "You deserve to feel safe online. Practical guidance and support in Kiswahili and English." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const { t } = useLang();
  const actions = [
    { to: "/check", icon: ScanText, label: { en: "Check a Message", sw: "Kagua Ujumbe" } },
    { to: "/guide", icon: LifeBuoy, label: { en: "Get Help Now", sw: "Pata Msaada Sasa" }, primary: true },
    { to: "/assistant", icon: MessageCircle, label: { en: "Talk to SafeOnline", sw: "Ongea na SafeOnline" } },
    { to: "/directory", icon: MapPin, label: { en: "Find Support Services", sw: "Tafuta Huduma za Msaada" } },
    { to: "/guide", icon: BookOpen, label: { en: "Learn About Online Safety", sw: "Jifunze Usalama Mtandaoni" } },
    { to: "/report", icon: FileWarning, label: { en: "Report a Problem", sw: "Ripoti Tatizo" } },
  ] as const;
  const how = [
    { icon: ScanText, title: { en: "Check", sw: "Kagua" }, body: { en: "Check a message or describe what is happening.", sw: "Kagua ujumbe au eleza kinachoendelea." } },
    { icon: BookOpen, title: { en: "Understand", sw: "Elewa" }, body: { en: "See possible warning signs and the limits of the assessment.", sw: "Ona dalili zinazowezekana na mipaka ya tathmini." } },
    { icon: ListChecks, title: { en: "Act", sw: "Chukua hatua" }, body: { en: "Choose practical safety, evidence and account-security steps.", sw: "Chagua hatua za usalama, ushahidi na kulinda akaunti." } },
    { icon: HeartHandshake, title: { en: "Get Support", sw: "Pata Msaada" }, body: { en: "Explore support options or choose to send a private report.", sw: "Angalia njia za msaada au chagua kutuma ripoti binafsi." } },
  ];
  return (
    <>
      <section className="bg-hero text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm font-semibold tracking-wide uppercase text-turquoise">SafeOnline</p>
            <h1 className="font-display text-4xl md:text-6xl leading-tight mt-3">{t({ en: "You Deserve to Feel Safe Online.", sw: "Unastahili Kujisikia Salama Mtandaoni." })}</h1>
            <p className="mt-5 text-lg opacity-90 max-w-lg">{t({ en: "Get practical guidance, understand your options, and find support if you are experiencing online harassment or abuse. You are not alone.", sw: "Pata mwongozo wa vitendo, elewa njia ulizonazo, na upate msaada ikiwa unanyanyaswa mtandaoni. Hauko peke yako." })}</p>
            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              {actions.map((a) => (
                <Link key={a.label.en} to={a.to} className={`flex items-center gap-3 rounded-2xl px-5 py-4 font-semibold transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-turquoise outline-none ${"primary" in a ? "bg-accent text-accent-foreground shadow-soft" : "bg-primary-foreground/10 hover:bg-primary-foreground/20 border border-primary-foreground/20"}`}>
                  <a.icon className="size-5 shrink-0" /> {t(a.label)}
                </Link>
              ))}
            </div>
          </div>
          <img src={hero} alt="" width={1024} height={1024} className="rounded-[2rem] shadow-soft w-full max-w-md mx-auto aspect-square object-cover" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-6">
        <PrivacyNotice />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-3xl text-primary">{t({ en: "How SafeOnline works", sw: "SafeOnline inavyofanya kazi" })}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {how.map((h, i) => (
            <div key={i} className="rounded-2xl bg-card border p-6">
              <div className="size-11 rounded-xl bg-secondary text-primary grid place-items-center"><h.icon className="size-5" /></div>
              <p className="mt-4 font-semibold">{i + 1}. {t(h.title)}</p>
              <p className="text-sm text-muted-foreground mt-1">{t(h.body)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <h2 className="font-display text-3xl text-primary">{t({ en: "What's happening to you?", sw: "Nini kinakutokea?" })}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
          {categories.map((c) => (
            <Link key={c.id} to="/guide" search={{ c: c.id }} className="rounded-2xl border bg-card p-5 hover:border-primary hover:shadow-soft transition">
              <ShieldCheck className="size-5 text-accent" />
              <p className="font-semibold mt-3">{t(c.title)}</p>
              <p className="text-sm text-muted-foreground mt-1">{t(c.summary)}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
