# TASK-009 — Structured Website Editor Foundation

## Status

**IN_PROGRESS**

## Branch

`agent/task-009-editor-main`

## Purpose

Introduce the first production editor workflow for Lonomart. The editor operates on the existing Website → WebsitePage → WebsiteSection → structured JSON boundary and reuses the existing renderer rather than creating a second content model.

## Scope

- Authenticated website editor route.
- Ownership-scoped website loading.
- Page selector.
- Section selector.
- Structured section content form for the initial renderer section types.
- Section content persistence through an authenticated API endpoint.
- Setup → Edit Website navigation.
- Preview navigation from the editor.
- Responsive editor layout.

## Non-Goals

- Drag and drop.
- Undo/redo history.
- Asset/media library.
- Full visual styling controls.
- Publishing.
- Public websites.
- Custom domains.
- AI generation.

## Architecture

```text
Website
  ↓
WebsitePage
  ↓
WebsiteSection
  ↓
Structured JSON content
  ↓
Editor form
  ↓
Ownership-scoped API update
  ↓
Website Renderer
```

## Security

Every editor page and section update is scoped through the authenticated Better Auth session. Client-provided user IDs are not trusted.

## Implementation

- `/dashboard/websites/[websiteId]/edit` editor route.
- Page and section navigation.
- Hero/about/services/CTA/contact text editing foundation.
- `/api/websites/[websiteId]/sections/[sectionId]` PATCH endpoint.
- Setup page Edit Website actions.

## Verification

Required before completion:

- Editor desktop verification.
- Editor mobile verification.
- Section save/reload verification.
- Ownership/security verification.
- Lint.
- TypeScript.
- Tests.
- Prisma validation/generation.
- Production build.
- Cloudflare/OpenNext build.

## Completion Rule

TASK-009 is not complete until the full verification suite passes and the task documentation, current-state, backlog, and changelog are synchronized before PR merge.
