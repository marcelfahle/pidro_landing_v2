# Contributing to Pidro Landing

Thanks for helping improve the [Pidro](https://www.pidro.online/) marketing site. This repo is a private Next.js app backed by DatoCMS and the Pidro API.

## Prerequisites

- **Node.js** 20.x (see `.tool-versions` if you use [asdf](https://asdf-vm.com/))
- **pnpm** — install with `corepack enable` or `npm install -g pnpm`
- **GitHub access** — ask [marcelfahle](https://github.com/marcelfahle) to add you as a collaborator if `git clone` fails
- **Environment variables** — copy `.env.example` to `.env.local` and get real values from the team (DatoCMS token, API URLs, `AUTH_SECRET`)

## Local setup

```bash
git clone https://github.com/marcelfahle/pidro_landing_v2.git
cd pidro_landing_v2
pnpm install
cp .env.example .env.local
# Edit .env.local with secrets from the team
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Branch and pull request workflow

We use short-lived branches and PRs into `main`:

1. **Update `main`**
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Create a branch** — use a descriptive prefix:
   - `feat/` — new feature or UI
   - `fix/` — bug fix
   - `chore/` — tooling, docs, deps
   - `refactor/` — code change without behavior change

   ```bash
   git checkout -b feat/your-change-name
   ```

3. **Work and verify**
   ```bash
   pnpm dev      # manual check in the browser
   pnpm lint     # ESLint
   pnpm build    # production build (run before larger changes)
   ```

4. **Commit** — clear message, focused diff:
   ```bash
   git add -A
   git commit -m "feat: describe what and why"
   ```

5. **Push and open a PR**
   ```bash
   git push -u origin HEAD
   gh pr create --base main --fill
   ```

6. **Review** — Marcel (or another maintainer) reviews and merges. Address feedback with new commits on the same branch.

## Project layout (quick map)

| Path | Purpose |
|------|---------|
| `app/` | Next.js App Router pages and API routes |
| `components/` | Shared UI (home sections, navbar, footer) |
| `lib/` | DatoCMS client, home page data, utilities |
| `auth.ts` | NextAuth (Auth.js) configuration |
| `public/` | Static assets, app links, ads.txt |
| `.cursor/rules/` | Cursor-specific conventions for forms and auth |

## Environment variables

See `.env.example` for the full list. Minimum to run the site:

- `NEXT_PUBLIC_API_BASE_URL`
- `AUTH_SECRET`
- `NEXT_DATOCMS_API_TOKEN`

Without valid DatoCMS and API values, some pages (home, blog, login) may error at build or runtime — that is expected until secrets are configured.

## Security reminders

- Never commit `.env`, `.env.local`, or API keys.
- Do not paste production secrets into PRs, issues, or chat.
- Auth cookies use `secure` in production — test login against the configured API base URL.

## Questions

Open a GitHub issue or ask in your usual team channel. For access or env values, contact the repo owner.
