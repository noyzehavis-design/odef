# Icons

Temporary mark (two coins). To swap in the real logo, replace these files and keep the names:

| File | Size | Notes |
| --- | --- | --- |
| `icon.svg` | any | Favicon and the in-app mark source. Rounded corners included. |
| `favicon-32.png` | 32×32 | Browser tab fallback |
| `icon-192.png`, `icon-512.png` | 192, 512 | PWA icons (`purpose: any`) |
| `icon-maskable-512.png` | 512 | Full-bleed background, artwork inside the center 80% (Android crops it) |
| `apple-touch-icon.png` | 180×180 | iPhone home screen. Full-bleed, no transparency (iOS rounds the corners) |

Also update `src/components/brand/logo-mark.tsx`, which draws the same mark inline.
