/**
 * Every user-facing string in ODEF lives here.
 *
 * Tone (see "טון" in docs/SPEC.md): young, light and fun, like a friend who
 * gets money, not like a bank. Short, spoken Hebrew, second person plural
 * (אתם), so it works for everyone in the family. No banking jargon.
 * When something is actually wrong (real overspend, suspicious charge) the
 * tone turns matter-of-fact: no jokes.
 */
export const copy = {
  app: {
    name: "עודף",
    nameEn: "ODEF",
    tagline: "הכסף של הבית, בלי כאב ראש ✌️",
    description: "אפליקציית התזרים של הבית: כמה אפשר להוציא היום, לאן הולך הכסף, וכמה נשאר בסוף החודש.",
  },

  nav: {
    label: "ניווט ראשי",
    home: "בית",
    transactions: "תנועות",
    insights: "תובנות",
    savings: "חסכונות",
    notifications: "התראות",
    settings: "הגדרות",
  },

  home: {
    greeting: "היי 👋",
    title: "מה המצב עם הכסף?",
    emptyTitle: "פה יופיע המספר של היום",
    emptyBody: "עוד רגע נחבר נתונים, ותראו כמה אפשר להוציא היום בלי לדאוג.",
  },

  transactions: {
    title: "תנועות",
    emptyTitle: "אפס תנועות. שקט מופתי 🧘",
    emptyBody: "ברגע שהבנק ידבר איתנו, כל קנייה תופיע כאן.",
  },

  insights: {
    title: "תובנות",
    emptyTitle: "עוד אין פה מה לנתח 🔍",
    emptyBody: "תנו לנו חודש של נתונים, ונגיד לכם לאן הכסף באמת הולך.",
  },

  savings: {
    title: "חסכונות",
    emptyTitle: "הקופה מחכה לכם 🐷",
    emptyBody: "כאן יגורו היעדים, הפנסיה והחסכונות של כל הבית.",
  },

  notifications: {
    title: "התראות",
    emptyTitle: "אין התראות. הכל רגוע ☀️",
    emptyBody: "אם משהו מוזר יקרה בחשבון, תשמעו מאיתנו קודם.",
    open: "פתיחת התראות",
  },

  settings: {
    title: "הגדרות",
    account: "החשבון",
    signedInAs: "מחוברים בתור",
    demoUser: "מצב דמו (בלי התחברות)",
    theme: "ערכת נושא",
    themeDark: "כהה",
    themeLight: "בהיר",
    themeSystem: "לפי המכשיר",
    signOut: "יציאה",
    signingOut: "יוצאים…",
    version: "גרסה",
    open: "הגדרות",
  },

  login: {
    pageTitle: "כניסה",
    title: "ברוכים הבאים לעודף",
    subtitle: "נכנסים עם מייל או גוגל, וזהו.",
    emailLabel: "מייל",
    emailPlaceholder: "you@example.com",
    sendLink: "שלחו לי קישור",
    sending: "שולחים…",
    or: "או",
    google: "כניסה עם Google",
    sentTitle: "שלחנו לכם מייל 📬",
    sentBody: (email: string) => `לחצו על הקישור שנשלח ל-${email}, או הקלידו כאן את הקוד מהמייל.`,
    codeLabel: "קוד מהמייל",
    verify: "כניסה",
    verifying: "בודקים…",
    changeEmail: "להחליף מייל",
    errors: {
      notAllowed: "המייל הזה עוד לא ברשימת המוזמנים 🙈",
      invalidEmail: "נראה שחסר משהו במייל",
      badCode: "הקוד לא עבד. נסו שוב, או בקשו קישור חדש.",
      linkExpired: "הקישור כבר לא בתוקף. בקשו קישור חדש ונמשיך.",
      generic: "משהו השתבש. נסו שוב עוד רגע.",
      notConfigured: "ההתחברות עוד לא הוגדרה (חסרים פרטי Supabase).",
    },
  },

  demo: {
    badge: "מצב דמו",
    hint: "Supabase עוד לא מחובר, אז אין התחברות. רק בפיתוח מקומי.",
  },

  offline: {
    title: "אין אינטרנט כרגע 📡",
    body: "נחזור לעדכן ברגע שהחיבור יחזור.",
  },
} as const;

export type Copy = typeof copy;
