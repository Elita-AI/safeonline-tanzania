import type { T } from "./i18n";

export type CategoryId = "bullying" | "threats" | "blackmail" | "impersonation" | "sexual" | "hacking";

export type Category = {
  id: CategoryId;
  icon: string;
  title: T;
  summary: T;
  keywords: string[];
  steps: T[];
  evidence: T[];
  platform: T[];
  referTo: ServiceCategory[];
};

export const categories: Category[] = [
  {
    id: "bullying",
    icon: "MessageCircleWarning",
    title: { en: "Cyberbullying & harassment", sw: "Unyanyasaji na uonevu mtandaoni" },
    summary: { en: "Repeated insults, mocking, or hateful messages.", sw: "Matusi ya mara kwa mara, kejeli, au jumbe za chuki." },
    keywords: ["bully", "insult", "harass", "mock", "hate", "comment", "matusi", "kunitukana", "dhihaka", "uonevu", "kejeli", "wananitukana"],
    steps: [
      { en: "Document repeated abusive messages, if it is safe to do so.", sw: "Hifadhi jumbe za unyanyasaji zinazojirudia, ikiwa ni salama kufanya hivyo." },
      { en: "Use blocking, muting, and restricting tools on the platform.", sw: "Tumia vipengele vya kuzuia (block), kunyamazisha (mute) na kudhibiti." },
      { en: "Strengthen your privacy settings — limit who can comment or message you.", sw: "Imarisha mipangilio ya faragha — punguza wanaoweza kukutumia ujumbe au kutoa maoni." },
      { en: "Talk to someone you trust, and reach out for emotional support if this is affecting your wellbeing.", sw: "Zungumza na mtu unayemwamini, na tafuta msaada wa kihisia ikiwa hali hii inakuathiri." },
    ],
    evidence: [
      { en: "Screenshot messages showing the username, date and time.", sw: "Piga picha ya skrini inayoonyesha jina la mtumiaji, tarehe na saa." },
      { en: "Copy profile links (URLs) of accounts involved.", sw: "Nakili viungo (URL) vya akaunti zinazohusika." },
    ],
    platform: [
      { en: "Report each abusive post or comment using the platform's “Report” option.", sw: "Ripoti kila chapisho au maoni kwa kutumia kitufe cha “Report” cha jukwaa." },
    ],
    referTo: ["counselling", "gbv"],
  },
  {
    id: "threats",
    icon: "ShieldAlert",
    title: { en: "Threats, stalking & intimidation", sw: "Vitisho, kufuatiliwa na kutishwa" },
    summary: { en: "Someone threatens you or tracks what you do.", sw: "Mtu anakutishia au anafuatilia unachofanya." },
    keywords: ["threat", "stalk", "follow", "track", "kill", "hurt", "location", "vitisho", "ananitishia", "ananifuatilia", "kuniua", "kuniumiza"],
    steps: [
      { en: "If you feel in immediate physical danger, prioritise getting to a safe place and contact emergency services.", sw: "Ukihisi uko hatarini kimwili sasa hivi, nenda mahali salama kwanza na wasiliana na huduma za dharura." },
      { en: "Do not confront the person. Avoid replying to threats.", sw: "Usimkabili mtu huyo. Epuka kujibu vitisho." },
      { en: "Turn off location sharing in apps and check which devices are logged into your accounts.", sw: "Zima kushiriki mahali ulipo kwenye programu na angalia vifaa vilivyoingia kwenye akaunti zako." },
      { en: "Tell a trusted person about the situation and make a simple safety plan.", sw: "Mweleze mtu unayemwamini kuhusu hali hii na mpange mpango rahisi wa usalama." },
    ],
    evidence: [
      { en: "Keep threats with dates and times — screenshots and saved messages.", sw: "Hifadhi vitisho pamoja na tarehe na saa — picha za skrini na jumbe." },
      { en: "Write a short private log of incidents somewhere only you can access.", sw: "Andika kumbukumbu fupi ya matukio mahali ambapo ni wewe tu unaweza kufikia." },
    ],
    platform: [{ en: "Report threatening accounts and messages to the platform.", sw: "Ripoti akaunti na jumbe za vitisho kwa jukwaa husika." }],
    referTo: ["emergency", "gbv", "legal"],
  },
  {
    id: "blackmail",
    icon: "Lock",
    title: { en: "Blackmail & private images", sw: "Usaliti na picha za faragha" },
    summary: { en: "Threats to share private images unless you pay or comply.", sw: "Vitisho vya kusambaza picha za faragha usipolipa au kutii." },
    keywords: ["blackmail", "nude", "photo", "picture", "image", "video", "pay", "money", "leak", "expose", "picha", "video", "pesa", "kunichafua", "kusambaza", "uchi", "ananidai"],
    steps: [
      { en: "This is not your fault. Avoid sending additional money or private material — it rarely stops the demands.", sw: "Hili si kosa lako. Epuka kutuma pesa zaidi au picha nyingine za faragha — mara nyingi haikomeshi madai." },
      { en: "Stop engaging, but do not delete the conversation yet if it may be needed as evidence.", sw: "Acha kuwasiliana naye, lakini usifute mazungumzo bado kama yanaweza kuhitajika kama ushahidi." },
      { en: "Review your account security and who can see your friends or followers list.", sw: "Kagua usalama wa akaunti yako na nani anaweza kuona orodha ya marafiki au wafuasi wako." },
      { en: "Find legal or victim-support assistance — you do not have to handle this alone.", sw: "Tafuta msaada wa kisheria au wa waathirika — huhitaji kukabiliana na hili peke yako." },
    ],
    evidence: [
      { en: "Preserve messages, usernames, payment requests and dates — if safe.", sw: "Hifadhi jumbe, majina ya watumiaji, maombi ya malipo na tarehe — ikiwa ni salama." },
      { en: "Never share intimate images with anyone as “proof”, including with SafeOnline.", sw: "Usitume picha za faragha kwa mtu yeyote kama “ushahidi”, hata kwa SafeOnline." },
    ],
    platform: [
      { en: "Report the account and use the platform's non-consensual intimate image reporting form.", sw: "Ripoti akaunti na tumia fomu ya jukwaa ya kuripoti picha za faragha zilizosambazwa bila ridhaa." },
    ],
    referTo: ["legal", "gbv", "counselling"],
  },
  {
    id: "impersonation",
    icon: "UserX",
    title: { en: "Fake accounts & impersonation", sw: "Akaunti bandia na kuigwa" },
    summary: { en: "Someone pretends to be you online.", sw: "Mtu anajifanya kuwa wewe mtandaoni." },
    keywords: ["fake", "impersonat", "pretend", "my name", "my photos", "account using", "bandia", "anajifanya", "jina langu", "akaunti feki"],
    steps: [
      { en: "Report the fake profile using the platform's impersonation option.", sw: "Ripoti akaunti bandia kwa kutumia chaguo la “impersonation” la jukwaa." },
      { en: "Let your contacts know a fake account exists, so they do not trust it.", sw: "Wajulishe watu wako kuwa kuna akaunti bandia, ili wasiiamini." },
      { en: "Limit who can download or see your photos.", sw: "Punguza wanaoweza kupakua au kuona picha zako." },
    ],
    evidence: [{ en: "Save the fake profile link and screenshots of posts made in your name.", sw: "Hifadhi kiungo cha akaunti bandia na picha za skrini za machapisho kwa jina lako." }],
    platform: [{ en: "Most platforms let you report impersonation even without an account.", sw: "Majukwaa mengi yanaruhusu kuripoti kuigwa hata bila kuwa na akaunti." }],
    referTo: ["digital", "legal"],
  },
  {
    id: "sexual",
    icon: "MailWarning",
    title: { en: "Unwanted sexual messages & exploitation", sw: "Jumbe za ngono zisizotakiwa na unyonyaji" },
    summary: { en: "Unwanted sexual content, grooming, or pressure.", sw: "Maudhui ya ngono yasiyotakiwa, kurubuniwa, au kushinikizwa." },
    keywords: ["sexual", "sex", "grooming", "older man", "send me", "pressure", "ngono", "ananiomba picha", "ananilazimisha", "mapenzi"],
    steps: [
      { en: "You have the right to say no and stop replying. Block and report the sender.", sw: "Una haki ya kukataa na kuacha kujibu. Mzuie na umripoti mtumaji." },
      { en: "If you are under 18, please tell a trusted adult — this is never your fault.", sw: "Kama una umri chini ya miaka 18, tafadhali mweleze mtu mzima unayemwamini — hili si kosa lako kamwe." },
      { en: "Ask a child-protection worker what support is available and what information they may need to share. Confidentiality cannot be guaranteed.", sw: "Muulize mhudumu wa ulinzi wa mtoto kuhusu msaada uliopo na taarifa anazoweza kuhitaji kushiriki. Usiri hauwezi kuhakikishwa." },
    ],
    evidence: [{ en: "Screenshot the sender's profile and messages, but do not save or forward sexual images.", sw: "Piga picha ya skrini ya wasifu na jumbe za mtumaji, lakini usihifadhi wala kusambaza picha za ngono." }],
    platform: [{ en: "Report the account for sexual harassment or child safety.", sw: "Ripoti akaunti kwa unyanyasaji wa kingono au usalama wa mtoto." }],
    referTo: ["child", "gbv", "counselling"],
  },
  {
    id: "hacking",
    icon: "KeyRound",
    title: { en: "Account hacking & privacy", sw: "Akaunti kudukuliwa na faragha" },
    summary: { en: "Lost access, strange logins, or someone reading your account.", sw: "Umepoteza akaunti, kuingia kwa ajabu, au mtu anasoma akaunti yako." },
    keywords: ["hack", "password", "login", "access", "locked", "spy", "phone", "imedukuliwa", "nenosiri", "siwezi kuingia", "akaunti yangu"],
    steps: [
      { en: "Use the platform's official account-recovery process only.", sw: "Tumia njia rasmi ya jukwaa ya kurejesha akaunti pekee." },
      { en: "Change compromised passwords from a secure device.", sw: "Badilisha nenosiri lililoathirika ukitumia kifaa salama." },
      { en: "Enable two-factor authentication (2FA).", sw: "Washa uthibitisho wa hatua mbili (2FA)." },
      { en: "Review active sessions, linked devices and recovery email/phone.", sw: "Kagua vipindi vilivyo hai, vifaa vilivyounganishwa na barua pepe/simu ya kurejesha." },
    ],
    evidence: [{ en: "Note login alerts and any messages sent from your account that you didn't write.", sw: "Andika arifa za kuingia na jumbe zozote zilizotumwa kutoka akaunti yako ambazo hukuandika." }],
    platform: [{ en: "Ignore people offering to “recover” your account for money — this is often a scam.", sw: "Puuza watu wanaojitolea “kurejesha” akaunti yako kwa malipo — mara nyingi ni utapeli." }],
    referTo: ["digital"],
  },
];

export const cyberthreats: { name: T; what: T; tagline?: T }[] = [
  { name: { en: "Mobile money fraud", sw: "Ulaghai wa Fedha za Simu" }, tagline: { en: "(Tuma kwa namba hii)", sw: "(Tuma kwa namba hii)" }, what: { en: "Someone pressures you to send mobile money to their number — a fake agent, a “I sent money by mistake, refund me” claim, a loan fee or a prize.", sw: "Mtu kukushinikiza utume pesa za simu kwa namba yao — mfanyakazi wa uongo, “nilituma pesa kwa kosa nirudishie”, ada ya mkopo au zawadi ya uongo." } },
  { name: { en: "Phishing", sw: "Ulaghai wa Phishing" }, what: { en: "Fake messages or links that trick you into giving passwords, PINs or money.", sw: "Ujumbe au viungo vya uongo vinavyokulaghai utoe nenosiri, PIN au pesa." } },
  { name: { en: "Cyberbullying", sw: "Unyanyasaji Mtandaoni" }, what: { en: "Repeated insults, mocking or shaming someone online.", sw: "Tusi, dhihaka au aibu zinazojirudia mtandaoni." } },
  { name: { en: "Blackmail & sextortion", sw: "Ushawishi wa Kifisadi" }, what: { en: "Threats to share private images or information unless you pay or comply.", sw: "Vitisho vya kusambaza picha au taarifa binafsi isipokuwa ulipe au utii." } },
  { name: { en: "Impersonation & fake accounts", sw: "Kuigiza na Akaunti za Uongo" }, what: { en: "Accounts pretending to be you or someone you know.", sw: "Akaunti zinazojifanya ni wewe au mtu unayemjua." } },
  { name: { en: "Account hacking", sw: "Kuvamiwa kwa Akaunti" }, what: { en: "Someone breaks into your email, social media or money accounts.", sw: "Mtu kuingia barua pepe, mitandao ya kijamii au akaunti zako za fedha bila ruhusa." } },
  { name: { en: "Online scams & fraud", sw: "Matapeli Mtandaoni" }, what: { en: "Fake offers, jobs, loans, prizes or investments that steal your money.", sw: "Ofa za uongo za kazi, mikopo, zawadi au uwekezaji zinazokuibia pesa." } },
  { name: { en: "Doxxing", sw: "Kusambaza Taarifa Binafsi" }, what: { en: "Sharing your private details (address, phone, workplace) publicly to harm you.", sw: "Kusambaza taarifa zako binafsi (anwani, simu, mahali pa kazi) hadharani ili kukudhuru." } },
  { name: { en: "Intimate images shared without consent", sw: "Picha za Siri Bila Ridhaa" }, what: { en: "Private or intimate images shared without the person's permission.", sw: "Picha binafsi au za siri kusambazwa bila ridhaa ya mmiliki." } },
  { name: { en: "Malware & harmful apps", sw: "Programu Hasidi" }, what: { en: "Apps or files that steal your data, money or control your device.", sw: "Programu au faili zinazoiba taarifa zako, pesa au kudhibiti kifaa chako." } },
];

export const dangerWords = ["danger", "outside my house", "kill me", "hurt me", "suicide", "attack", "hatari", "kuniua", "nje ya nyumba", "kujiua", "ananipiga"];

/**
 * General safety guidance used when a message does not match a specific
 * category. The assistant answers from this instead of asking the user
 * to clarify. General guidance only — not a safety determination.
 */
export const generalGuidance: T[] = [
  { en: "You do not have to reply to messages that upset or pressure you. It is okay to step away.", sw: "Hulazimiki kujibu jumbe zinazokusumbua au kukushinikiza. Ni sawa kujitoa kidogo." },
  { en: "Block or mute the account, and report it to the platform if it broke the rules.", sw: "Zuia (block) au nyamazisha akaunti hiyo, na iripoti kwa jukwaa ikiwa imevunja sheria." },
  { en: "Strengthen your privacy settings — limit who can see your posts, photos and who can message you.", sw: "Imarisha mipangilio ya faragha — punguza wanaoweza kuona machapisho na picha zako na wanaoweza kukutumia ujumbe." },
  { en: "If it is safe, keep a record of what happened (screenshots with dates and usernames) in case you need it later.", sw: "Ikiwa ni salama, hifadhi kumbukumbu ya kilichotokea (picha za skrini zenye tarehe na majina ya watumiaji) kwa mahitaji ya baadaye." },
  { en: "Talk to someone you trust. If this involves threats, private images or someone who knows where you are, reach out to a support service.", sw: "Zungumza na mtu unayemwamini. Ikiwa kunahusu vitisho, picha za faragha au mtu anayejua ulipo, wasiliana na huduma ya msaada." },
];

export type ServiceCategory = "gbv" | "counselling" | "legal" | "child" | "digital" | "emergency";

export const serviceCategories: Record<ServiceCategory, T> = {
  gbv: { en: "GBV & victim support", sw: "Ukatili wa kijinsia na msaada kwa waathirika" },
  counselling: { en: "Counselling & mental health", sw: "Ushauri nasaha na afya ya akili" },
  legal: { en: "Legal aid", sw: "Msaada wa kisheria" },
  child: { en: "Child protection", sw: "Ulinzi wa mtoto" },
  digital: { en: "Digital security", sw: "Usalama wa kidijitali" },
  emergency: { en: "Emergency services", sw: "Huduma za dharura" },
};

export type Service = {
  id: string;
  name: T;
  categories: ServiceCategory[];
  /** "National" or a region name */
  region: string;
  phones: string[];
  whatsapp: string[];
  /** Short codes reached by SMS, not by voice call */
  sms?: string[];
  email?: string;
  link: string | null;
  hours: T | null;
  languages: string[];
  lastVerified: string | null;
  /** true only after an administrator has confirmed details with the organisation */
  verified: boolean;
  demo: boolean;
  pinned?: boolean;
  /** Named officer contacts, e.g. a verified police contact board. Labels are titles and names, so they are not translated. */
  contacts?: { label: string; phone: string }[];
  note?: T;
};

export const NATIONAL = "National";

const regionalOfficers: [string, string][] = [
  ["Arusha", "0677200372"], ["Dar es Salaam", "0677200373"], ["Dodoma", "0677200374"], ["Geita", "0677200375"],
  ["Iringa", "0677200376"], ["Kagera", "0677200377"], ["Katavi", "0677200378"], ["Kigoma", "0677200379"],
  ["Kilimanjaro", "0677200381"], ["Lindi", "0677200382"], ["Manyara", "0677200383"], ["Mara", "0677200384"],
  ["Mbeya", "0677200385"], ["Morogoro", "0677200386"], ["Mtwara", "0677200387"], ["Mwanza", "0677200388"],
  ["Njombe", "0677200389"], ["Pwani", "0677200391"], ["Rukwa", "0677200392"], ["Ruvuma", "0677200393"],
  ["Singida", "0677200394"], ["Simiyu", "0677200395"], ["Songwe", "0677200396"], ["Shinyanga", "0677200397"],
  ["Tabora", "0677200398"], ["Tanga", "0677200399"],
];

const base = { whatsapp: [] as string[], link: null, hours: null, languages: ["Kiswahili", "English"], lastVerified: null, verified: false, demo: false };

/** Date the SafeOnline team confirmed the Tanzania Police Force officer contact board. */
export const POLICE_BOARD_VERIFIED = "2026-11-05";

/**
 * Officer contacts copied verbatim from the Tanzania Police Force contact board
 * ("In case of any difficulty, please contact any of the following officers"),
 * confirmed as verified by the SafeOnline team. Titles, names and ranks are kept
 * exactly as printed on the board — never expanded or guessed.
 */
export const policeOfficers: { title: string; name: string; rank: string; phone: string }[] = [
  { title: "CPF", name: "C M. Wambura", rank: "IGP", phone: "0699 998899" },
  { title: "DCI", name: "R H. Kingai", rank: "CP", phone: "0688 369606" },
  { title: "ZPC", name: "M J. Muliro", rank: "SACP", phone: "0735 009983" },
  { title: "ZCO", name: "F J. Mafwele", rank: "SACP", phone: "0755 855743" },
  { title: "RPC", name: "M. Kitinkwi", rank: "SACP", phone: "0739 009976" },
  { title: "RTO", name: "S. Mwangamilo", rank: "SSP", phone: "0658 376478" },
  { title: "RCO", name: "M S. Mirabo", rank: "SSP", phone: "0658 444592" },
  { title: "OCD", name: "D D. Mwakinyuke", rank: "SP", phone: "0659 888610" },
  { title: "OC CID", name: "A S. Nindi", rank: "SP", phone: "0659 885117" },
];

/**
 * ADMIN: Add or edit services here. Set `verified: true` and `lastVerified`
 * only after confirming details directly with the organisation.
 * Records marked verified carry the date the SafeOnline team confirmed them;
 * all others are shown with an "Unverified" badge.
 */
export const services: Service[] = [
  { ...base, id: "police-officers", pinned: true, verified: true, lastVerified: POLICE_BOARD_VERIFIED, name: { en: "Tanzania Police Force — Officer contacts", sw: "Jeshi la Polisi Tanzania — Mawasiliano ya Maafisa" }, categories: ["emergency"], region: NATIONAL, phones: [],
    contacts: policeOfficers.map((o) => ({ label: `${o.title} — ${o.name}, ${o.rank}`, phone: o.phone })),
    note: { en: "Officer contacts from the Tanzania Police Force contact board, verified by the SafeOnline team. Call the number that fits your situation and ask for the Gender and Children Desk or the Cybercrime Unit.", sw: "Mawasiliano ya maafisa kutoka ubao wa mawasiliano ya Jeshi la Polisi Tanzania, yaliyothibitishwa na timu ya SafeOnline. Piga namba inayofaa kwa hali yako na uombe Dawati la Jinsia na Watoto au Kitengo cha Uhalifu wa Mtandaoni." } },
  { ...base, id: "child-116", pinned: true, verified: true, lastVerified: "2026-11-06", name: { en: "National Child Helpline", sw: "Huduma ya Simu ya Msaada kwa Watoto" }, categories: ["child"], region: NATIONAL, phones: ["116"],
    note: { en: "Toll-free helpline for children. Verified by the SafeOnline team on 2026-11-06.", sw: "Simu ya msaada kwa watoto bila malipo. Imethibitishwa na timu ya SafeOnline tarehe 2026-11-06." } },
  { ...base, id: "tcra-15040", pinned: true, verified: true, lastVerified: "2026-11-06", name: { en: "TCRA — Report scammers & suspicious numbers by SMS (15040)", sw: "TCRA — Ripoti wadangalifu na namba za shaka kwa SMS (15040)" }, categories: ["digital"], region: NATIONAL, phones: [], sms: ["15040"],
    note: { en: "Tanzania Communications Regulatory Authority short code — report by SMS, not by call. Text 15040 to report SMS and phone scammers, suspicious numbers and other cyberthreats. Verified by the SafeOnline team on 2026-11-06.", sw: "Namba fupi ya Mamlaka ya Mawasiliano Tanzania (TCRA) — ripoti kwa SMS, si kwa simu. Tuma SMS kwa 15040 kuripoti wadangalifu wa SMS na simu, namba zenye shaka na vitisho vingine vya mtandaoni. Imethibitishwa na timu ya SafeOnline tarehe 2026-11-06." } },
  { ...base, id: "ministry-gender", pinned: true, name: { en: "Ministry of Community Development, Gender, Women and Special Groups — WhatsApp/SMS reporting", sw: "Wizara ya Maendeleo ya Jamii, Jinsia, Wanawake na Makundi Maalum — Kuripoti kwa WhatsApp/SMS" }, categories: ["gbv", "child"], region: NATIONAL,
    phones: ["0774112233", "0769608130", "0766400168"], whatsapp: ["0774112233", "0769608130", "0766400168"], link: "https://jamii.go.tz",
    note: { en: "National numbers to report GBV or ask the Ministry questions.", sw: "Namba za kitaifa za kuripoti ukatili wa kijinsia au kuuliza Wizara maswali." } },
  ...regionalOfficers.map(([region, phone]): Service => ({ ...base, id: `swo-${region.toLowerCase().replace(/\s+/g, "-")}`,
    name: { en: `Social Welfare Officer — ${region}`, sw: `Afisa Ustawi wa Jamii — ${region}` }, categories: ["gbv", "child"], region, phones: [phone], languages: ["Kiswahili"],
    note: { en: "Regional officer from the Ministry's list. Call to verify before launch.", sw: "Afisa wa mkoa kutoka orodha ya Wizara. Piga simu kuthibitisha kabla ya kuzindua." } })),
  { ...base, id: "tz-cert", name: { en: "TZ-CERT (Tanzania Computer Emergency Response Team)", sw: "TZ-CERT (Timu ya Taifa ya Kushughulikia Matukio ya Kompyuta)" }, categories: ["digital"], region: NATIONAL,
    phones: ["+255222412039"], email: "incidents@tzcert.go.tz", link: "https://tzcert.go.tz", hours: { en: "Mon–Fri, 8am–4pm", sw: "Jumatatu–Ijumaa, saa 2 asubuhi–saa 10 jioni" },
    note: { en: "For hacked accounts, unauthorized access and technical incidents. Free. Has an online incident form. Not for harassment or blackmail cases.", sw: "Kwa akaunti zilizodukuliwa, uingiaji usioidhinishwa na matukio ya kiufundi. Bure. Ina fomu ya mtandaoni ya kuripoti. Si kwa kesi za unyanyasaji au usaliti." } },
  { ...base, id: "police-cyber", name: { en: "Police Cybercrime Unit / Gender and Children Desk", sw: "Kitengo cha Polisi cha Uhalifu wa Mtandaoni / Dawati la Jinsia na Watoto" }, categories: ["digital", "emergency", "gbv"], region: NATIONAL, phones: [],
    note: { en: "For fraud, threats, blackmail and impersonation. Reach the Cybercrime Unit through the pinned Tanzania Police Force officer contacts or the nearest police station.", sw: "Kwa utapeli, vitisho, usaliti na kujifanya mtu mwingine. Wasiliana na Kitengo cha Uhalifu wa Mtandaoni kupitia mawasiliano ya maafisa ya Jeshi la Polisi yaliyowekwa juu, au kituo cha polisi kilicho karibu." } },
  { ...base, id: "lp-digital", name: { en: "LP Digital Cyber Helpline (The Launchpad Tanzania)", sw: "LP Digital Cyber Helpline (The Launchpad Tanzania)" }, categories: ["digital", "legal", "counselling", "gbv"], region: NATIONAL,
    phones: ["+255676333935"], link: "https://www.lpdigital.or.tz" },
  { ...base, id: "lhrc", name: { en: "Legal and Human Rights Centre (LHRC)", sw: "Kituo cha Sheria na Haki za Binadamu (LHRC)" }, categories: ["legal"], region: NATIONAL, phones: [],
    note: { en: "Legal guidance and human-rights support. Contact details to be added after checking its website.", sw: "Ushauri wa kisheria na msaada wa haki za binadamu. Mawasiliano yataongezwa baada ya kuangalia tovuti yake." } },
  { ...base, id: "zanzibar-ministry", name: { en: "Zanzibar — Ministry of Community Development, Gender, Elderly and Children", sw: "Zanzibar — Wizara ya Maendeleo ya Jamii, Jinsia, Wazee na Watoto" }, categories: ["gbv", "child"], region: "Zanzibar", phones: [],
    note: { en: "Placeholder. Mainland officer numbers do not cover Zanzibar. Contact details to be added.", sw: "Nafasi ya muda. Namba za maafisa wa Tanzania Bara hazihudumii Zanzibar. Mawasiliano yataongezwa." } },
];

export const serviceRegions: string[] = [...new Set(services.map((s) => s.region).filter((r) => r !== NATIONAL))].sort();

export function detectCategory(text: string): CategoryId | null {
  return safetySignals.find((signal) => signal.pattern.test(text))?.category ?? null;
}

export function detectDanger(text: string) {
  return /\b(outside (my|your) (house|door)|kill (me|you)|hurt (me|you)|attacking me|immediate danger|suicid\w*|nje ya nyumba|kuniua|nitakuua|kujiua|ananipiga|nitakupiga|hatari sasa)\b/i.test(text);
}

/** Conservative bilingual demonstration signals; never a safety determination. */
export const safetySignals: { category: CategoryId; label: T; pattern: RegExp }[] = [
  { category: "blackmail", label: { en: "Demand or threat to expose private material", sw: "Dai au tishio la kufichua picha au taarifa za faragha" }, pattern: /\b(blackmail|sextortion|extort\w*|leak\w*|expose\w*|post my photos|share your nudes|nisipomtumia|usipolipa|nitavujisha|nitapost|atasambaza|nitasambaza|kusambaza)\b/i },
  { category: "threats", label: { en: "Threat of harm or stalking", sw: "Tishio la kudhuru au kufuatiliwa" }, pattern: /\b(threat\w*|stalk\w*|kill (me|you)|hurt (me|you)|outside (my|your) (house|door)|vitisho|ananitishia|nitakuua|kuniua|nitakupiga|ananifuatilia)\b/i },
  { category: "impersonation", label: { en: "Possible fake profile or identity misuse", sw: "Huenda ni akaunti bandia au matumizi mabaya ya utambulisho" }, pattern: /\b(fake account|fake profile|impersonat\w*|pretend\w* to be me|using my name|akaunti (bandia|feki)|anajifanya kuwa mimi|jina langu)\b/i },
  { category: "sexual", label: { en: "Sexual content or pressure for intimate material", sw: "Maudhui ya ngono au shinikizo la picha za faragha" }, pattern: /\b(sexual|sext\w*|nudes?|naked|groom\w*|ngono|uchi|ananiomba picha)\b/i },
  { category: "hacking", label: { en: "Possible scam, credential request or account compromise", sw: "Huenda ni utapeli, ombi la taarifa za kuingia au akaunti kudukuliwa" }, pattern: /\b(scam\w*|phish\w*|hack\w*|password|otp|verification code|can't log in|can’t log in|can't log into|nenosiri|siwezi kuingia|imedukuliwa|utapeli|tapeli|tuma code|won a prize|shinda zawadi)\b/i },
  { category: "bullying", label: { en: "Abusive messages or harassment", sw: "Jumbe za matusi au unyanyasaji" }, pattern: /\b(bully\w*|insult\w*|harass\w*|mock\w*|hate you|matusi|kunitukana|dhihaka|uonevu|kejeli|wananitukana|ananitukana)\b/i },
  { category: "bullying", label: { en: "Body shaming or mocking someone's appearance", sw: "Kudhihaki mwili au sura ya mtu" }, pattern: /\b(body[- ]?sham\w*|fat|fatty|skinny|ugly|kembamba|mwembamba|kanene|mnene|manyama uzembe|bonge|kibonge|ubonge|kitambi|sura mbaya|mbaya wa sura|sura kama ya|shape flan|shape fulani|hana shape|kana shape|kasura|kijisura|kimbaumbau|mbaumbau|mfupi kama)\b/i },
];

export const assessmentLabels: Record<CategoryId, T> = {
  bullying: { en: "Harassment", sw: "Unyanyasaji" },
  threats: { en: "Threat", sw: "Tishio" },
  blackmail: { en: "Blackmail or sextortion", sw: "Vitisho vya kushinikiza malipo au ngono" },
  impersonation: { en: "Impersonation", sw: "Kuigwa" },
  sexual: { en: "Unwanted sexual content", sw: "Maudhui ya ngono yasiyotakiwa" },
  hacking: { en: "Scam or hacking", sw: "Utapeli au udukuzi" },
};

export function assessText(text: string) {
  const matched = safetySignals.filter((signal) => signal.pattern.test(text));
  const immediateDanger = detectDanger(text);
  const category = immediateDanger ? "threats" : matched[0]?.category ?? null;
  const risk: "Lower" | "Medium" | "High" = immediateDanger || category === "blackmail" || category === "threats" ? "High" : matched.length ? "Medium" : "Lower";
  const reason: T = risk === "High"
    ? { en: "Threats or coercion can escalate. Prioritise your safety and human support.", sw: "Vitisho au shinikizo vinaweza kuongezeka. Tanguliza usalama wako na msaada wa mtu." }
    : risk === "Medium"
      ? { en: "Possible abuse or account-security warning signs were matched. Context matters.", sw: "Dalili za unyanyasaji au tatizo la usalama wa akaunti zimetambuliwa. Muktadha ni muhimu." }
      : { en: "No recognised warning signs were matched. This does not mean the situation is safe; links and identities are not verified.", sw: "Hakuna dalili zinazojulikana zilizotambuliwa. Hii haimaanishi kuwa hali ni salama; viungo na utambulisho havijathibitishwa." };
  const found = [...new Set(matched.flatMap((signal) => [...text.matchAll(new RegExp(signal.pattern.source, "gi"))].map((m) => m[0].toLowerCase())))];
  return { category, risk, reason, warnings: matched.map((signal) => signal.label), found, immediateDanger };
}

export function verifiedEmergencyServices(records: Service[] = services): Service[] {
  return records.filter((service) => service.categories.includes("emergency") && service.verified && !service.demo && Boolean(service.lastVerified) && Boolean(service.phones.length || service.contacts?.length || service.link));
}

/** Plain-language information about the Cybercrimes Act, 2015. General information only — never presented as legal advice. Links point to official government sources. */
export const lawInfo = {
  title: { en: "Know the law: the Cybercrimes Act, 2015", sw: "Fahamu sheria: Sheria ya Makosa ya Mtandao, 2015" },
  short: { en: "What the Cybercrimes Act, 2015 covers and the penalties it sets — in plain language.", sw: "Sheria ya Makosa ya Mtandao ya 2015 inashughulikia nini, na adhabu zinazowekwa — kwa lugha rahisi." },
  intro: {
    en: "Tanzania's Cybercrimes Act, 2015 (Act No. 14 of 2015) is the main law covering online and computer-related offences. Here is a short, plain-language summary of the parts most relevant to your situation. This is general information, not legal advice — a lawyer or a legal aid service can advise on your specific case.",
    sw: "Sheria ya Makosa ya Mtandao ya Tanzania ya 2015 (Sheria Na. 14 ya 2015) ni sheria kuu inayohusu makosa ya mtandaoni na kompyuta. Hii chini ni muhtasari mfupi kwa lugha rahisi wa sehemu zinazogusa hali kama zako. Huu ni maelezo ya jumla, sio ushauri wa kisheria — wakili au huduma ya msaada wa kisheria ndiyo wanaweza kukushauri kwa kina.",
  },
  offences: [
    {
      heading: { en: "Hacking and entering accounts without permission", sw: "Udukuzi na kuingia kwenye akaunti bila ruhusa" },
      body: { en: "Breaking into someone's computer, phone or account without permission, or intercepting their messages, is a crime. This covers someone who guesses, steals or resets your password to get into your accounts.", sw: "Kuingia kwenye kompyuta, simu au akaunti ya mtu mwingine bila ruhusa, au kusikiliza jumbe zake bila kujulikana, ni kosa la jinai. Hii inahusu mtu anayetabiri, kuiba au kubadilisha nenosiri lako ili kuingia kwenye akaunti zako." },
      penalty: { en: "Fine of at least TZS 3,000,000 or three times the undue advantage gained (whichever is greater), or imprisonment of at least 1 year, or both — Section 4.", sw: "Faini ya angalau shilingi milioni 3 au mara tatu ya faida waliyoipata (kiwango kikubwa zaidi), au kifungo cha jela cha angalau mwaka 1, au zote mbili — Kifungu cha 4." },
    },
    {
      heading: { en: "Impersonation and identity misuse", sw: "Kuigwa na matumizi mabaya ya utambulisho" },
      body: { en: "Using another person's name, photos or details to create a fake profile or to pretend to be them online is an identity-related crime.", sw: "Kutumia jina, picha au taarifa za mtu mwingine kufungua akaunti bandia au kujifanya kuwa yeye mtandaoni ni kosa linalohusu utambulisho." },
      penalty: { en: "Fine of at least TZS 5,000,000 or three times the undue advantage gained (whichever is greater), or imprisonment of at least 7 years, or both — Section 15.", sw: "Faini ya angalau shilingi milioni 5 au mara tatu ya faida (kiwango kikubwa zaidi), au kifungo cha jela cha angalau miaka 7, au zote mbili — Kifungu cha 15." },
    },
    {
      heading: { en: "Cyberbullying and insulting messages", sw: "Unyanyasaji mtandaoni na jumbe za matusi" },
      body: { en: "The Act addresses cyberbullying, including messages that humiliate, insult or intimidate a person. These are criminal offences, so the person sending them can face fines or imprisonment.", sw: "Sheria inashughulikia unyanyasaji mtandaoni, pamoja na jumbe zinazokera, kutusi au kutishia mtu. Haya ni makosa ya jinai, hivyo mtu anayeyatuma anaweza kukumbana na faini au kifungo." },
      penalty: { en: "Fine of at least TZS 5,000,000, or imprisonment of at least 3 years, or both — Section 23.", sw: "Faini ya angalau shilingi milioni 5, au kifungo cha jela cha angalau miaka 3, au zote mbili — Kifungu cha 23." },
    },
    {
      heading: { en: "Private images and sexual content", sw: "Picha za faragha na maudhui ya ngono" },
      body: { en: "The Act criminalises sexual content involving children, and handles obscene material shared online. Sharing someone's private images without their agreement is treated seriously under Tanzanian law.", sw: "Sheria inatisha makosa ya maudhui ya ngono yanayohusisha watoto, na inashughulikia picha za uchi zinazosambazwa mtandaoni. Kutangaza picha za faragha za mtu bila ridhaa yake ni jambo linalopewa uzito mkubwa kisheria." },
      penalty: { en: "Child pornography: fine of at least TZS 50,000,000 or imprisonment of at least 7 years, or both. Obscene material: fine of at least TZS 30,000,000 or imprisonment of at least 10 years, or both — Sections 13–14.", sw: "Pornografia ya watoto: faini ya angalau shilingi milioni 50 au jela kwa angalau miaka 7, au zote mbili. Maudhui ya uchi yasiyoheshimiwa: faini ya angalau shilingi milioni 30 au jela kwa angalau miaka 10, au zote mbili — Kifungu cha 13–14." },
    },
    {
      heading: { en: "Scams, fraud and forgery", sw: "Utapeli, udanganyifu na ughairi" },
      body: { en: "Computer-related fraud and forgery are crimes — for example fake prize messages, investment scams, or forged documents and identities used online.", sw: "Udanganyifu na ughairi kwa kompyuta ni makosa — kwa mfano jumbe za zawadi bandia, utapeli wa uwekezaji, au hati na utambulisho bandia yanayotumika mtandaoni." },
      penalty: { en: "Fine of at least TZS 20,000,000 or three times the undue advantage gained (whichever is greater), or imprisonment of at least 7 years, or both — Sections 11–12.", sw: "Faini ya angalau shilingi milioni 20 au mara tatu ya faida (kiwango kikubwa zaidi), au kifungo cha jela cha angalau miaka 7, au zote mbili — Kifungu cha 11–12." },
    },
    {
      heading: { en: "Publishing false information", sw: "Kutangaza taarifa za uongo" },
      body: { en: "The Act also criminalises publishing false information online. If someone spreads lies about you, keep screenshots of what was posted — this record can help when you report it to the platform or the police.", sw: "Sheria pia inatisha kutangaza taarifa za uongo mtandaoni. Kama mtu anasambaza uongo kuhusu wewe, weka picha za skrini za yaliyochapishwa — rekodi hii inaweza kusaidia ukiipostia jukwaa au polisi." },
      penalty: { en: "Fine of at least TZS 5,000,000, or imprisonment of at least 3 years, or both — Section 16.", sw: "Faini ya angalau shilingi milioni 5, au kifungo cha jela cha angalau miaka 3, au zote mbili — Kifungu cha 16." },
    },
  ],
  note: {
    en: "The Act covers more topics than listed here — for example how electronic evidence is collected and how investigations work — and it has been amended since 2015. Use the official links below to read the full text.",
    sw: "Sheria inashughulikia mada zaidi kuliko zilizoorodheshwa hapa — kwa mfano jinsi ushahidi wa kielektroniki unavyokusanywa na jinsi uchunguzi unavyofanyika — na imebadilishwa tangu 2015. Tumia viungo rasmi hapa chini kusoma matini kamili.",
  },
  penaltyNote: {
    en: "These are the minimum penalties in the official revised edition of the Act (2023). Amounts and terms can be higher, and the Act has been amended since — the official text and a lawyer can give you exact, current figures.",
    sw: "Hizi ni adhabu ndogo zaidi kwenye toleo rasmi lililorekebishwa la sheria (2023). Viwango vinaweza kuwa vikubwa zaidi, na sheria imebadilishwa tangu wakati huo — matini rasmi na wakili ndiyo wanaweza kukupa takwimu sahihi za sasa.",
  },
  linksLabel: { en: "Read the full Act (official government sources)", sw: "Soma sheria kamili (vyanzo rasmi vya serikali)" },
  links: [
    { label: { en: "The Cybercrimes Act, 2015 — Attorney General's portal", sw: "Sheria ya Makosa ya Mtandao, 2015 — tovuti ya Mwakilishi Mkuu wa Serikali" }, href: "https://oagmis.oag.go.tz/portal/acts/89" },
    { label: { en: "Download the Act as a PDF (revised edition)", sw: "Pakua sheria kama PDF (toleo lililorekebishwa)" }, href: "https://oagmis.oag.go.tz/portal/acts/revised/543/download" },
  ],
};
