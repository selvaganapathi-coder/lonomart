# ADR-009 — Authentication Provider

## Context

Lonomart needs secure account creation, login, logout, and database-backed sessions. Authentication is security-sensitive infrastructure and is not a product differentiator for the MVP.

The application uses Next.js 16.3.1, Prisma 7.9.1, PostgreSQL, Ant Design, and Cloudflare/OpenNext.

## Options considered

### 1. Build authentication in-house

Would require Lonomart to maintain password hashing, session lifecycle, cookies, CSRF/origin protections, account recovery, and security-sensitive edge cases.

**Rejected:** unnecessary security and maintenance burden.

### 2. Auth.js

Mature Next.js authentication ecosystem, but the MVP requirement is email/password plus database-backed sessions with a simple Prisma integration and no OAuth requirement.

**Not selected for TASK-002.**

### 3. Better Auth

Provides email/password authentication, database sessions, Prisma integration, Next.js App Router integration, secure cookies, origin/CSRF protections, and built-in rate limiting.

**Selected.**

## Decision

Use:

**Better Auth + Prisma 7 + PostgreSQL + database-backed sessions.**

Prisma 7 uses the PostgreSQL driver adapter `@prisma/adapter-pg`. Better Auth uses its Prisma adapter against the generated Prisma client.

## Consequences

### Positive

- Avoids custom authentication security code.
- Database-backed sessions fit Lonomart's SaaS requirements.
- Email/password is sufficient for MVP.
- Authentication remains modular for future OAuth, 2FA, or passkey features.
- Next.js 16 integration is supported.

### Negative

- Adds an external authentication dependency.
- Authentication behavior follows Better Auth's release and migration model.
- Cloudflare/OpenNext runtime compatibility must be verified.

## Security constraints

- Never disable Better Auth CSRF protection.
- Use explicit trusted origins.
- Keep `BETTER_AUTH_SECRET` server-side.
- Validate sessions server-side for protected application routes.
- Do not treat a client-side session state or cookie existence as authorization.
- Do not log passwords, session tokens, or authentication secrets.
