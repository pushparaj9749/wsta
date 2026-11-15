# WSTA — Instagram jaisa platform (200 budget)

Photo sharing app. **Compress + Cloud Storage** wala plan — public post bina lock, sirf compress hoga.

## Features (MVP)
- Home Feed (Supabase DB se, demo fallback), Stories, Explore, Profile
- Post upload (client-side WebP compress: 5MB → ~250KB)
- Like / Comment, Login / Signup (Supabase Auth)
- Reels / Messages — Phase 2 placeholder

## Supabase Project (connected ✅)
- Project: `wsta` — ref `effpkfajwqetiddcqopi`
- Region: `ap-south-1` (Mumbai)
- URL: `https://effpkfajwqetiddcqopi.supabase.co`
- Tables: profiles, posts, likes, comments, follows, stories
- Buckets: posts, avatars, stories (public)

## Run locally
```bash
npm install
npm run dev
```
Bina keys ke **Demo Mode** me chalega.

## Real mode on karna
1. Supabase Dashboard → Project Settings → API → `anon` key copy karo (service_role kabhi frontend me mat dalo)
2. `.env.local` banao:
```
NEXT_PUBLIC_SUPABASE_URL=https://effpkfajwqetiddcqopi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```
3. `npm run dev` restart karo

## Storage Plan
| Layer | Kaam | Cost |
|---|---|---|
| Client compress (WebP 1080px) | Upload se pehle 20x kam | ₹0 |
| Supabase Storage | Photo save | Free 1GB |
| Cloudflare R2 (ready) | Baad me, zero egress | Free 10GB |

## Deploy (free)
Vercel pe import karo → env vars dalo → deploy. Domain baad me ₹200 me `.in`.

## GitHub Actions
`.github/workflows/ci.yml` — har push pe typecheck + build.
