# עודף · ODEF

אפליקציית התזרים של הבית: כמה אפשר להוציא היום, לאן הולך הכסף, וכמה נשאר בסוף החודש. PWA בעברית, כהה כברירת מחדל.

האפיון המלא: [docs/SPEC.md](docs/SPEC.md). כללי העבודה בקוד: [CLAUDE.md](CLAUDE.md).

## הרצה מקומית

```bash
npm install
npm run dev
```

בלי משתני Supabase האפליקציה רצה ב**מצב דמו**: בלי התחברות, רק לפיתוח מקומי. כדי לבדוק התחברות, העתיקו את `.env.example` ל-`.env.local` ומלאו.

## הקמת Supabase (פעם אחת)

1. פותחים פרויקט חדש ב-[supabase.com](https://supabase.com) (אזור: Frankfurt, הכי קרוב).
2. **Project Settings → API Keys**: מעתיקים את ה-Project URL ואת ה-Publishable key ל-`NEXT_PUBLIC_SUPABASE_URL` ו-`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
3. **Authentication → URL Configuration**: ‏Site URL הוא כתובת האתר ב-Vercel. ב-Redirect URLs מוסיפים `https://<הדומיין>/**` ו-`http://localhost:3000/**`.
4. **Authentication → Emails → Magic Link**: מדביקים את התבנית מ-[supabase/templates/magic-link.html](supabase/templates/magic-link.html). היא שולחת גם קישור וגם קוד בן 6 ספרות (הקוד חשוב באייפון, כשהאפליקציה מותקנת למסך הבית).
5. **Google (אופציונלי)**: ‏Authentication → Sign In / Providers → Google, עם Client ID ו-Secret מ-Google Cloud Console. ה-Redirect URI שמוגדר בגוגל הוא ה-Callback URL שמופיע אצל Supabase.
6. `ALLOWED_EMAILS`: רשימת המיילים שמורשים להיכנס, מופרדים בפסיק.

## Deploy ב-Vercel

1. ב-Vercel: ‏Add New → Project → מייבאים את `odef` מ-GitHub. ההגדרות של Next.js מזוהות לבד.
2. ב-Environment Variables מוסיפים את המשתנים מ-`.env.example` של שלב 0: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `ALLOWED_EMAILS`.
3. Deploy. בלי משתני Supabase ב-production אף אחד לא נכנס (זה בכוונה).

## התקנה בטלפון

- **אייפון**: פותחים ב-Safari → שיתוף → "הוסף למסך הבית".
- **אנדרואיד**: פותחים ב-Chrome → תפריט → "התקן אפליקציה".

## פקודות

| פקודה | מה זה עושה |
| --- | --- |
| `npm run dev` | שרת פיתוח |
| `npm run build` | בילד production (כולל ה-service worker) |
| `npm run typecheck` | בדיקת TypeScript |
| `npm run lint` | ESLint |
