# Changelog

## 2026-08-18

### Documentation Sync

- Added the missing TASK-008 completion record for Production Visual Design System & Template Quality.
- Updated current project state through TASK-008.
- Corrected the task backlog so completed tasks and the active roadmap match the actual repository history.

### TASK-008 — Completed

- Added production-oriented website header and navigation treatment.
- Added responsive mobile navigation presentation.
- Refined hero typography, spacing, CTA hierarchy and visual composition.
- Refined About, Services, CTA, Contact and Footer sections.
- Improved responsive desktop and mobile composition.
- Preserved the data-driven renderer/editor boundary.
- Verified desktop and mobile preview behavior.
- Verified lint, TypeScript, tests, Prisma validation/generation, production build and Cloudflare/OpenNext build.

### TASK-007 — Completed

- Added GitHub Actions CI for pull requests to `master` and pushes to `master`.
- Automated Prisma validation/generation, lint, TypeScript, tests, Next.js build and Cloudflare/OpenNext build.
- Added CI-only Better Auth environment values.
- Added Cloudflare PostgreSQL adapter dependency and bundling configuration.

### TASK-006 — Completed

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

### TASK-003 — Completed

- Added authenticated dashboard management shell.
- Added `My Websites` empty state and next-step indication.
- Refined the dashboard toward a Google-inspired minimal visual system.
- Reduced dashboard spacing and summary-card density so the primary empty state is visible earlier in the viewport.

## 2026-08-16

### TASK-001 / TASK-002 — Completed

- Completed TASK-001 — Lonomart Foundation & Architecture Bootstrap.
- Completed TASK-002 — Authentication Foundation.
- Integrated Better Auth with Prisma 7 and PostgreSQL-backed sessions.
- Verified authentication sign-up, sign-in, sign-out, and protected dashboard flow locally.
- Verified TypeScript, lint, tests, Prisma validation/generation, migration status, Next.js production build, and Cloudflare/OpenNext build.
- Resolved the Windows OpenNext local-development runtime issue by separating normal Next.js development from the Cloudflare Workers runtime.
- Resolved the Ant Design Typography subcomponent/client-boundary runtime issue.

### Verification Note

Verification is performed locally on Windows. Production deployment, PostgreSQL production connectivity, R2 connectivity, and load testing remain unverified until their respective tasks require them.
