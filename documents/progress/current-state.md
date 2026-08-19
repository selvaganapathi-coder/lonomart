# Current State

**Date:** 2026-08-19

## Phase

Publication model and draft-to-published workflow.

## Current task

TASK-012 — Publication Model and Publish Workflow — **IN PROGRESS**.

TASK-011 — Draft Editing, Autosave and Revision Safety — **DONE**.

TASK-010 — Asset Management and Cloudflare R2 Integration — **DONE**.

TASK-009 — Structured Website Editor Foundation — **DONE**.

TASK-008 — Production Visual Design System & Template Quality — **DONE**.

TASK-007 — GitHub Actions CI — **DONE**.

TASK-006 — Website Renderer & Preview Foundation — **DONE**.

TASK-005 — Template & Website Structure — **DONE**.

TASK-004 — Website Creation Foundation — **DONE**.

TASK-003 — User Dashboard Foundation — **DONE**.

TASK-002 — Authentication Foundation — **DONE**.

TASK-001 — Lonomart Foundation & Architecture Bootstrap — **DONE**.

## Repository

Lonomart is a Next.js 16.3.1 App Router application using TypeScript, React 19.2.8, Ant Design, Tailwind CSS 4, Prisma 7.9.1, PostgreSQL, Cloudflare/OpenNext, and Cloudflare R2 architecture.

## Completed Product Foundations

- Foundation and deployment architecture.
- Ant Design management UI boundary.
- Better Auth with PostgreSQL-backed sessions.
- Protected authenticated dashboard.
- Google-inspired dashboard foundation.
- Customer-owned Website model.
- Quick Setup and starter-template selection.
- Website creation and draft persistence.
- Versioned template definitions.
- Website pages and structured sections.
- Structured draft website renderer and preview.
- Production visual foundation for the starter website.
- GitHub Actions CI validation for pull requests and master pushes.
- Structured website editor foundation with page/section content persistence.
- Website asset library foundation and Cloudflare R2 integration.
- Draft autosave and optimistic revision safety.

## TASK-011 Implementation Status

Completed and merged to `master`:

- Added `WebsiteSection.revision` optimistic-concurrency field.
- Added `WebsiteSectionRevision` history model and migration.
- Made section PATCH saves revision-aware and atomic.
- Rejects stale writes with HTTP `409` / `REVISION_CONFLICT`.
- Added editor autosave with debounced persistence.
- Added save-state feedback and manual save fallback.
- Added revision-aware editor hydration.
- Verified local autosave persistence and refresh recovery.
- Verified revision-conflict behavior.

## TASK-012 Implementation Status

In progress on `agent/task-012-publish-workflow`:

- Added `WebsitePublication` as the durable published snapshot boundary.
- Added `Website.draftRevision` to distinguish draft changes from the last published revision.
- Added publication migration and unique current-publication relationship.
- Added authenticated ownership-scoped publish endpoint.
- Publish captures website, pages and structured sections into an immutable snapshot for that publication version.
- Added publication versioning for subsequent publishes.
- Added authenticated unpublish endpoint.
- Added editor publish/unpublish controls and unpublished-change indication.
- Draft edits continue against the editable `WebsitePage`/`WebsiteSection` records and do not mutate the published snapshot.

## Current Product Features

Implemented:

- Foundation
- Authentication
- Dashboard foundation
- Website project creation
- Quick Setup
- Starter template selection
- Versioned template definitions
- Website page structure
- Website section structure
- Structured section content
- Draft website preview renderer
- Production starter-template visual foundation
- Automated CI validation
- Structured website editor
- Website asset library foundation
- Draft autosave
- Revision-safe section persistence
- Publication snapshot and publish/unpublish workflow

Not yet implemented:

- Public website renderer
- Public asset delivery
- SEO
- Custom domains
- Billing

## Architecture Status

The editable and published website states are now explicitly separated:

```text
User
  ↓
Website
  ├── Draft: WebsitePage → WebsiteSection → structured JSON
  │             ↓
  │        autosave + revisions
  │
  └── Published: WebsitePublication
                  ↓
             versioned snapshot
```

Publishing copies the current draft structure into `WebsitePublication.snapshot`. Subsequent draft edits do not mutate the published snapshot. Re-publishing creates the next publication version and replaces the current published snapshot. Unpublishing removes the current publication and returns the website to DRAFT status.

## Security Status

Better Auth continues to provide database-backed sessions. Website, section, revision, publication, and asset operations require an authenticated server session and are scoped by the authenticated user's website ownership. No client-supplied owner ID is trusted.

## CI Status

GitHub Actions validates pull requests to `master` and pushes to `master` with:

- Prisma validate.
- Prisma generate.
- ESLint.
- TypeScript.
- Vitest.
- Next.js production build.
- Cloudflare/OpenNext build.

## Verification Status

TASK-012 implementation verification is pending local database migration, lint, TypeScript, tests, and publish/unpublish functional checks.

## Next Recommended Task

TASK-013 — Public Website Renderer.
