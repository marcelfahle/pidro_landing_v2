This is the website for the [Pidro](https://www.pidro.online/) multiplayer card game for iOS, Mac and Android.

It is made with Next.js and DatoCMS.

## Invite proxy

Vercel serves `www.pidro.online` while Phoenix owns invite pages and mobile-app association
files. `beforeFiles` rewrites proxy `/j/*`, `/.well-known/*` and the root
`/apple-app-site-association` path to `https://app.pidro.online`. Auth.js middleware excludes
those paths so the responses keep their backend status, headers and cookie-free contract.

`PIDRO_BACKEND_ORIGIN` can override the Phoenix origin for a preview deployment. Do not point it
at `www.pidro.online`, which would create a rewrite loop.
