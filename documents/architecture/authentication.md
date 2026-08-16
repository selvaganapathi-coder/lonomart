# Authentication Architecture

## Decision

Lonomart uses **Better Auth + Prisma 7 + PostgreSQL + database-backed sessions** for MVP authentication.

## Authentication flow

```text
Browser
  ↓
Better Auth client
  ↓
/api/auth/[...all]
  ↓
Better Auth
  ↓
Prisma adapter
  ↓
Prisma 7 PostgreSQL adapter
  ↓
PostgreSQL
```

## Authentication records

Better Auth persists its core authentication records through Prisma:

- `user`
- `session`
- `account`
- `verification`

The schema is version-controlled in `prisma/schema.prisma` and the initial migration is stored under `prisma/migrations/`.

## Session model

Sessions are persisted in PostgreSQL. The browser receives Better Auth's secure session cookie; the server remains authoritative by validating the session against Better Auth for protected pages and actions.

The `/dashboard` page performs an authoritative server-side `auth.api.getSession()` check and redirects unauthenticated requests to `/sign-in`.

## Next.js integration

Authentication is mounted at:

`/api/auth/[...all]`

Next.js 16's `proxy.ts` is intentionally not used as the sole authorization boundary. Better Auth's documentation warns that cookie-existence checks are not sufficient security. Protected pages perform server-side session validation.

## Password policy

MVP email/password authentication requires passwords between 8 and 128 characters. Better Auth handles password hashing and verification.

## Origin and CSRF protection

Better Auth origin validation remains enabled. `trustedOrigins` is configured from the explicit application URL. CSRF checks are not disabled.

Production must not use a localhost trusted origin.

## Rate limiting

Better Auth's built-in rate limiter is enabled. Authentication endpoints use stricter limits than the general default:

- Sign in: 10 requests per 60 seconds
- Sign up: 5 requests per 60 seconds

The rate limiter uses the default storage for this MVP. If multi-instance production traffic requires shared rate-limit state, that decision must be made from measured requirements rather than added prematurely.

## Secrets

Required server-side variables:

- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `DATABASE_URL`

`BETTER_AUTH_SECRET` must never be committed, logged, or exposed to the browser.

## Non-goals

TASK-002 does not include:

- OAuth providers
- Password reset email delivery
- Email verification delivery
- 2FA
- Passkeys
- Teams
- Roles/permissions
- Organizations
- Admin authentication

These are separate roadmap items.

## Cloudflare compatibility

The implementation must pass the OpenNext Cloudflare build. Runtime authentication must be verified against the actual deployed environment before production launch.
