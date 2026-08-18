# TASK-004 — Website Creation Foundation

**Type:** Feature  
**Priority:** P0  
**Status:** DONE

## Objective

Allow an authenticated customer to create the first Lonomart website project through a short Quick Setup flow and persist an isolated draft website instance.

## Product Outcome

```text
Dashboard
  ↓
Create Website
  ↓
Quick Setup
  ↓
Business Information
  ↓
Choose Starter Template
  ↓
Create Website
  ↓
Draft Website Instance
```

The task established the website project boundary. It does not build the editor or publishing system.

## Scope

- Website database model.
- User-to-website ownership relationship.
- Website status model with `DRAFT`, `PUBLISHED`, and `ARCHIVED` states.
- Website slug and ownership indexes.
- Versioned starter-template key stored on the website instance.
- Structured `businessProfile` JSON for Quick Setup data.
- Authenticated `/dashboard/websites/new` creation flow.
- Business name, category, description, contact details and primary CTA fields.
- Three curated starter-template choices.
- Server-side validation and authorization.
- Dashboard website counts and recent website cards.
- Creation confirmation page protected by both session and website ownership.
- Prisma migration.

## Non-Scope

- Full template master/version database.
- Template page/section schemas.
- Website editor.
- Page management.
- Section management.
- Asset uploads.
- Preview renderer.
- Publishing.
- Public website routing.
- Custom domains.
- SEO.
- Billing.

## Verification

Verified locally before merge:

- Browser website creation flow.
- TypeScript.
- Production build.
- Cloudflare/OpenNext build.
- Website migration applied and database reported up to date.

## Result

TASK-004 was merged into `master` as PR #6. The next task adds the page/section structure that the future editor and renderer will consume.
