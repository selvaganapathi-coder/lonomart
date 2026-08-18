# Changelog

## 2026-08-17

### TASK-004 — In Progress

- Added the first customer-owned `Website` database model.
- Added Website status, ownership indexes and unique slug constraint.
- Added Quick Setup business profile storage.
- Added three curated starter-template choices with explicit versions.
- Added authenticated website creation flow using a Next.js Server Action.
- Added server-side validation and ownership enforcement.
- Connected the dashboard to real website counts and recent website projects.
- Added an authenticated website creation confirmation page.
- Added TASK-004 architecture and task documentation.

### TASK-003 Baseline

- Added authenticated dashboard management shell.
- Added `My Websites` empty state and next-step indication.
- Refined the dashboard toward a Google-inspired minimal visual system.
- Reduced dashboard spacing and summary-card density so the primary empty state is visible earlier in the viewport.

## 2026-08-16

### Completed

- Completed TASK-001 — Lonomart Foundation & Architecture Bootstrap.
- Completed TASK-002 — Authentication Foundation.
- Integrated Better Auth with Prisma 7 and PostgreSQL-backed sessions.
- Verified authentication sign-up, sign-in, sign-out, and protected dashboard flow locally.
- Verified TypeScript, lint, tests, Prisma validation/generation, migration status, Next.js production build, and Cloudflare/OpenNext build.
- Resolved the Windows OpenNext local-development runtime issue by separating normal Next.js development from the Cloudflare Workers runtime.
- Resolved the Ant Design Typography subcomponent/client-boundary runtime issue.

### Project State

- Foundation phase is complete.
- Authentication foundation is complete.
- TASK-003 dashboard baseline is carried into TASK-004.
- TASK-004 — Website Creation Foundation is the active task.

### Verification Note

Verification is performed locally on Windows. Production deployment, PostgreSQL production connectivity, R2 connectivity, and load testing remain unverified until their respective tasks require them.
