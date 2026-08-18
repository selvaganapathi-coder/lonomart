# Changelog

## 2026-08-18

### TASK-006 — In Progress

- Added a typed website renderer boundary independent from editor components.
- Added responsive renderers for hero, about, services, CTA and contact sections.
- Added a safe fallback for unknown section types.
- Added authenticated, ownership-scoped draft website preview.
- Added page selection in preview.
- Added preview actions to the website setup screen.
- Added renderer content contract tests.
- Added ADR-010 documenting the renderer/editor boundary.

### TASK-005 — Completed

- Added versioned code-managed template definitions.
- Added structured WebsitePage and WebsiteSection models.
- Added page/section database migration and ordering indexes.
- Instantiated template pages and sections during website creation.
- Added server-side template/version validation.
- Added website structure display to the website setup screen.
- Added template structure contract tests.
- Updated database and editor architecture documentation.

### TASK-004 — Completed

- Completed Website Creation Foundation and merged PR #6.
- Verified Quick Setup, website creation, TypeScript, production build and Cloudflare/OpenNext build locally.

## 2026-08-17

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
- TASK-003 dashboard foundation is complete.
- TASK-004 website creation foundation is complete.
- TASK-005 template and website structure is complete.
- TASK-006 website renderer and preview is the active task.

### Verification Note

Verification is performed locally on Windows. Production deployment, PostgreSQL production connectivity, R2 connectivity, and load testing remain unverified until their respective tasks require them.
