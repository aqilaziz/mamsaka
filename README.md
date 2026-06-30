# MAMSAKA — Student Portfolio Platform

**A full-stack project portfolio platform for MAM 1 Paciran students**, built to give students a real place to publish, showcase, and get feedback on the projects they build in class — not a static gallery, but a living platform with profiles, stars, and discovery.

Built and maintained by [Aqil Aziz](https://github.com/aqilaziz), educator at MAM 1 Paciran Lamongan.

---

## What it does

- **Project publishing** — students create profiles and publish projects with descriptions, links, and metadata
- **Discovery** — a public explore page surfaces published projects, ranked by stars
- **Social proof** — students can star each other's projects, encouraging engagement and friendly competition
- **Per-student pages** — each student gets a public profile (`/p/[username]`) showcasing their work
- **Dashboard** — authenticated area for managing your own projects
- **Auth** — full email/password flow with registration, login, and password recovery

## Tech stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 15 (App Router) | Server components for fast, SEO-friendly project pages |
| Database & Auth | Supabase (free tier) | Postgres + auth + storage in one, zero infra cost — important for a school project |
| Styling | Tailwind CSS | Fast iteration, consistent design system |
| Hosting | Vercel | Static-friendly, generous free tier |
| CI | GitHub Actions | Keepalive workflow to prevent Supabase free-tier project pausing |

The whole stack runs on free tiers by design — this is a real platform for a real school with a real budget of zero.

## Architecture

```
src/app/
├── page.tsx          — homepage with featured projects
├── explore/          — public project discovery
├── p/[username]/      — public student profile pages
├── projects/[slug]/   — individual project pages
├── dashboard/         — authenticated project management
├── auth/, login/,
│   register/,
│   forgot-password/   — full auth flow
└── api/               — server actions and route handlers

supabase/
├── migrations/        — versioned Postgres schema
└── functions/         — edge functions
```

## Run locally

```bash
npm install
cp .env.local.example .env.local
# fill in your Supabase project URL and anon key
npm run dev
```

App runs at `http://localhost:3000`.

## Database

Schema is managed via Supabase migrations in `supabase/migrations/`. To set up a fresh Supabase project:

```bash
supabase db push
```

## Status

Production-ready and in active use at MAM 1 Paciran. This is a working platform, not a demo — students are publishing real projects on it.

## License

MIT
