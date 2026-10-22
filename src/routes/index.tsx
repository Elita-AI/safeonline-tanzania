import { createFileRoute, Link } from "@tanstack/react-router";
import { LifeBuoy, MessageCircle, MapPin, BookOpen, Lock, ListChecks, HeartHandshake, ShieldCheck, FileWarning } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { useLang } from "@/lib/i18n";
import { categories } from "@/lib/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SafeOnlineTanzania — Safe Online. Supported Offline." },
      { name: "description", content: "Bilingual digital safety guidance and support referrals for women and girls in Tanzania facing online abuse." },
      { property: "og:title", content: "SafeOnlineTanzania" },
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
    { to: "/guide", icon: LifeBuoy, label: { en: "Get Help Now", sw: "Pata Msaada Sasa" }, primary: true },
    { to: "/assistant", icon: MessageCircle, label: { en: "Talk to SafeOnlineTanzania", sw: "Ongea na SafeOnlineTanzania" } },
    { to: "/directory", icon: MapPin, label: { en: "Find Support Services", sw: "Tafuta Huduma za Msaada" } },
    { to: "/guide", icon: BookOpen, label: { en: "Learn About Online Safety", sw: "Jifunze Usalama Mtandaoni" } },
    { to: "/report", icon: FileWarning, label: { en: "Report a Problem", sw: "Ripoti Tatizo" } },
  ] as const;
  const how = [
    { icon: MessageCircle, title: { en: "Share what's happening", sw: "Eleza kinachoendelea" }, body: { en: "In your own words, in Kiswahili or English. No account needed.", sw: "Kwa maneno yako, kwa Kiswahili au Kiingereza. Huhitaji kujisajili." } },
    { icon: ListChecks, title: { en: "Get practical steps", sw: "Pata hatua za vitendo" }, body: { en: "Clear checklists for evidence, account security and reporting.", sw: "Orodha rahisi za ushahidi, usalama wa akaunti na kuripoti." } },
    { icon: HeartHandshake, title: { en: "Connect with people who help", sw: "Ungana na wanaosaidia" }, body: { en: "Find legal, counselling, child-protection and emergency support.", sw: "Pata msaada wa kisheria, ushauri, ulinzi wa watoto na dharura." } },
  ];
  return (
    <>
      <section className="bg-hero text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm font-semibold tracking-wide uppercase text-turquoise">SafeOnlineTanzania</p>
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

      <section className="mx-auto max-w-6xl px-4 -mt-6 relative">
        <div className="rounded-2xl bg-card shadow-soft border p-5 flex gap-4 items-start">
          <Lock className="size-6 text-primary shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-base">{t({ en: "Your privacy comes first", sw: "Faragha yako ni kipaumbele" })}</p>
            <p className="text-muted-foreground mt-1">{t({ en: "No registration. Chats are not saved. We never ask for your name, location, or images. Only if you choose to send a report is it stored — and only the SafeOnlineTanzania team can see it. Use Quick Exit at the top at any time.", sw: "Hakuna usajili. Mazungumzo hayahifadhiwi. Hatuombi jina lako, mahali ulipo, wala picha. Ripoti inahifadhiwa tu ukituma wewe mwenyewe — na inaonekana na timu ya SafeOnlineTanzania pekee. Tumia Ondoka Haraka juu wakati wowote." })} <Link to="/privacy" className="text-primary underline">{t({ en: "Read more", sw: "Soma zaidi" })}</Link></p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-3xl text-primary">{t({ en: "How SafeOnlineTanzania works", sw: "SafeOnlineTanzania inavyofanya kazi" })}</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
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
