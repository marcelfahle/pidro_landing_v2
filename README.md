# Pidro Landing (v2)

Marketing and content site for [Pidro](https://www.pidro.online/) — multiplayer card game for iOS, Mac, and Android.

Built with **Next.js 15**, **DatoCMS**, **Tailwind CSS**, and **NextAuth** against the Pidro API.

## Quick start

```bash
pnpm install
cp .env.example .env.local
# Add secrets from the team, then:
pnpm dev
```

See **[CONTRIBUTING.md](./CONTRIBUTING.md)** for the full contributor workflow (branching, PRs, lint/build checks).

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Development server at http://localhost:3000 |
| `pnpm build` | Production build |
| `pnpm start` | Run production build locally |
| `pnpm lint` | ESLint (Next.js config) |

## Stack

- Next.js App Router (`app/`)
- DatoCMS for pages, blog, and home content
- Auth.js / NextAuth for login and profile
- Deployed on Vercel (typical; confirm with maintainers)

## Repo

https://github.com/marcelfahle/pidro_landing_v2
