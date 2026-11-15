# WSTA — Instagram jaisa platform (200 budget)

Photo sharing app. **Compress + Cloud Storage** wala plan — public post bina lock, sirf compress hoga.

## Features (MVP)
- Home Feed, Stories, Explore, Profile
- Post upload (client-side WebP compress: 5MB → ~250KB)
- Like / Comment (demo mode me local)
- Reels / Messages — Phase 2 placeholder

## Storage Plan (final)
| Layer | Kaam | Cost |
|---|---|---|
| Client compress (WebP 1080px) | Upload se pehle size 20x kam | ₹0 |
| Supabase Storage (posts/avatars/stories) | Photo save | Free 1GB |
| Cloudflare R2 (ready) | Baad me switch, zero egress | Free 10GB |
| Backblaze B2 (ready) | Sasta backup $6.95/TB | Free 10GB |

E2EE sirf DM/private ke liye baad me. Public post me lock nahi.

## Run locally
```bash
npm install
npm run dev
```
Bina Supabase keys ke **Demo Mode** me chalega (picsum photos).

## Supabase connect karna (5 min)
1. supabase.com pe free project banao
2. SQL Editor me `supabase/schema.sql` paste karke Run karo
3. Storage me buckets `posts`, `avatars`, `stories` public banao (schema se ban jayenge)
4. Project Settings → API se URL + anon key copy karo
5. `.env.local` banao:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```
6. `npm run dev` restart karo — real mode on!

Keys kabhi GitHub pe commit mat karo. `.env.local` gitignore me hai.

## Deploy (free)
Vercel pe import karo → env vars dalo → deploy. Domain baad me ₹200 me `.in`.

## GitHub Actions
`.github/workflows/ci.yml` — har push pe typecheck + build check hoga.
