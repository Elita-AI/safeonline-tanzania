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
  name: string;
  category: ServiceCategory;
  region: string;
  phone: string | null;
  link: string | null;
  hours: T | null;
  languages: string[];
  lastVerified: string | null;
  /** true only after an administrator has confirmed details with the organisation */
  verified: boolean;
  demo: boolean;
  note?: T;
};

/**
 * ADMIN: Add or edit services here. Set `verified: true` and `lastVerified`
 * only after confirming details directly with the organisation.
 * Demo records must keep `demo: true` and must not contain real contact details.
 */
export const services: Service[] = [
  {
    id: "police-112",
    name: "Tanzania Police Force — Emergency line",
    category: "emergency",
    region: "National",
    phone: "112",
    link: null,
    hours: { en: "24 hours (to be verified)", sw: "Saa 24 (inahitaji kuthibitishwa)" },
    languages: ["Kiswahili", "English"],
    lastVerified: null,
    verified: false,
    demo: false,
    note: { en: "Publicly listed national emergency number. Confirm before launch.", sw: "Namba ya dharura ya kitaifa inayojulikana. Thibitisha kabla ya kuzindua." },
  },
  {
    id: "child-116",
    name: "National Child Helpline",
    category: "child",
    region: "National",
    phone: "116",
    link: null,
    hours: null,
    languages: ["Kiswahili", "English"],
    lastVerified: null,
    verified: false,
    demo: false,
    note: { en: "Publicly listed toll-free child helpline. Confirm operator and hours before launch.", sw: "Namba ya bure ya msaada kwa watoto. Thibitisha mtoa huduma na saa kabla ya kuzindua." },
  },
  { id: "d1", name: "[Demo] Dar es Salaam Women's Support Centre", category: "gbv", region: "Dar es Salaam", phone: null, link: null, hours: { en: "Mon–Fri, 08:00–17:00 (sample)", sw: "Jtatu–Ijumaa, 08:00–17:00 (mfano)" }, languages: ["Kiswahili", "English"], lastVerified: null, verified: false, demo: true },
  { id: "d2", name: "[Demo] Arusha Legal Aid Desk", category: "legal", region: "Arusha", phone: null, link: null, hours: null, languages: ["Kiswahili"], lastVerified: null, verified: false, demo: true },
  { id: "d3", name: "[Demo] Mwanza Youth Counselling Service", category: "counselling", region: "Mwanza", phone: null, link: null, hours: null, languages: ["Kiswahili", "Sukuma"], lastVerified: null, verified: false, demo: true },
  { id: "d4", name: "[Demo] Digital Safety Help Desk", category: "digital", region: "Online / National", phone: null, link: null, hours: null, languages: ["Kiswahili", "English"], lastVerified: null, verified: false, demo: true },
  { id: "d5", name: "[Demo] Dodoma Gender & Children's Desk", category: "child", region: "Dodoma", phone: null, link: null, hours: null, languages: ["Kiswahili"], lastVerified: null, verified: false, demo: true },
  { id: "d6", name: "[Demo] Zanzibar Survivors' Network", category: "gbv", region: "Zanzibar", phone: null, link: null, hours: null, languages: ["Kiswahili"], lastVerified: null, verified: false, demo: true },
  { id: "d7", name: "[Demo] Mbeya Community Legal Clinic", category: "legal", region: "Mbeya", phone: null, link: null, hours: null, languages: ["Kiswahili", "English"], lastVerified: null, verified: false, demo: true },
];

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
      : { en: "No recognised warning signs were matched. Lower does not mean safe; links and identities are not verified.", sw: "Hakuna dalili zinazojulikana zilizotambuliwa. Kiwango cha chini hakimaanishi salama; viungo na utambulisho havijathibitishwa." };
  return { category, risk, reason, warnings: matched.map((signal) => signal.label), immediateDanger };
}

export function verifiedEmergencyServices(records: Service[] = services): Service[] {
  return records.filter((service) => service.category === "emergency" && service.verified && !service.demo && Boolean(service.lastVerified) && Boolean(service.phone || service.link));
}

/** Plain-language information about the Cybercrimes Act, 2015. General information only — never presented as legal advice. Links point to official government sources. */
export const lawInfo = {
  title: { en: "Know the law: the Cybercrimes Act, 2015", sw: "Fahamu sheria: Sheria ya Makosa ya Mtandao, 2015" },
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
