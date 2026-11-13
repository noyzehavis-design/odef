# עודף (ODEF)

Family cash-flow PWA in Hebrew. Full product spec: `docs/SPEC.md`. Read it before any stage of work; the staged prompts are at its end.

@AGENTS.md

## Stack

- Next.js 16 (App Router, Turbopack, `src/proxy.ts` instead of middleware), TypeScript, Tailwind v4, shadcn/ui (new-york, in `src/components/ui`).
- Supabase Auth via `@supabase/ssr` (magic link + 6-digit code + Google). Data in Supabase from stage 3.
- PWA: `src/app/manifest.ts`, service worker `src/app/sw.ts` built by `@serwist/turbopack` (route `src/app/serwist/[path]`).
- `cacheComponents` is off on purpose: every screen is private and per-request, and Serwist's Turbopack route needs segment config.
- Deploys on Vercel. `npm run build` must pass before every PR. Run `npm run typecheck` and `npm run lint` too.

## Rules

**RTL and Hebrew**
- `<html lang="he" dir="rtl">`. Use logical classes (`ps-`, `pe-`, `ms-`, `me-`, `start-`, `end-`, `border-s/e`, `text-start`), never `left`/`right`/`pl`/`pr` unless it's genuinely physical.
- Every amount goes through `<Amount />` (`src/components/amount.tsx`) or `formatILS()` (`src/lib/format.ts`): LTR island, `tabular-nums`, ₪ via `Intl.NumberFormat('he-IL')`. Same for emails, card numbers, dates in digits: wrap in `dir="ltr"`.
- Charts run right to left (time axis starts on the right).

**Copy and tone**
- All user-facing text lives in `src/lib/copy.ts`. No Hebrew string literals in components.
- Tone: young, light, fun. A friend who gets money, not a bank. Short spoken Hebrew, plural "אתם" (works for every family member). One small emoji where it helps. No banking jargon ("יתרת זכות").
- Real problems (overspend, suspicious or duplicate charge, expired bank link) get a matter-of-fact tone. No jokes there.
- Empty states have a bit of humor.

**Design tokens**
- Colors only from CSS variables in `src/app/globals.css` (`bg-card`, `text-muted-foreground`, `text-success`, `bg-cat-3`...). No hex in components. Dark is the default theme (`next-themes`), light and system are options.
- Brand violet `primary`. Status: `success` (income, all good), `warning` (approaching a limit), `danger` (over, suspicious). Categories: `cat-1`…`cat-8`, fixed per category.
- Rubik (`next/font`). Big amounts: weight 300, 40–56px. Cards: `rounded-3xl`, thin border, no heavy shadows, generous padding.
- Motion is short and respects `prefers-reduced-motion` (handled globally in `globals.css`).

**Navigation**
- Exactly four tabs (`src/lib/nav.ts`): בית · תנועות · תובנות · חסכונות. Don't add a fifth. Bell and avatar (→ settings) sit at the top of Home. Floating bottom bar on phones, narrow rail on the right from `md`.

**Security**
- Secrets only on the server: never in `NEXT_PUBLIC_*`, never in client components. Financy, Claude, VAPID private key and the Supabase secret key stay server-side.
- Only emails in `ALLOWED_EMAILS` get in. Enforced in `src/proxy.ts`, in `/auth/*` callbacks, and in `requireUser()` (`src/lib/auth/session.ts`). Every Server Action / route that touches household data calls `requireUser()` itself; don't rely on the proxy.
- From stage 3: RLS on every table, scoped by `household_id`.
- Demo mode: with no Supabase env and `NODE_ENV !== "production"`, auth is skipped so UI work can run on mock data. Production without Supabase config lets nobody in.

## Layout

```
src/app/(app)/        signed-in screens (shell in layout.tsx)
src/app/login/        login screen + server actions
src/app/auth/         callback (OAuth), confirm (magic link token_hash), signout
src/components/       app-shell/, brand/, ui/ (shadcn), shared components
src/lib/              copy.ts, format.ts, env.ts, nav.ts, auth/, supabase/
public/icons/         app icons (temporary mark, to be replaced)
supabase/templates/   auth email templates to paste into Supabase
```
