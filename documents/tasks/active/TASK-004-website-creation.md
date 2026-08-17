# TASK-004 — Website Creation Foundation

**Type:** Feature  
**Priority:** P0  
**Status:** IN_PROGRESS

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

The task establishes the website project boundary. It does not build the editor or publishing system.

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

## Product Decision

A small starter-template catalog is stored in code for this task, while the website instance stores `templateKey` and `templateVersion`. This gives each created website a stable template reference without prematurely introducing the complete template master/version system. The full template architecture will be a separate task.

## Database

`Website` belongs to exactly one `User`.

Important fields:

- `id`
- `userId`
- `name`
- `slug`
- `status`
- `templateKey`
- `templateVersion`
- `businessProfile`
- `createdAt`
- `updatedAt`

Indexes:

- unique `slug`
- `userId`
- `(userId, status)`

Deletion is cascading from User to Website so abandoned account data cannot become orphaned.

## Security

- The creation page requires a valid Better Auth server session.
- The Server Action independently validates the session before writing.
- `userId` always comes from the authenticated session, never from form input.
- The confirmation page queries by both website ID and authenticated user ID.
- Template selection is validated against the server-side catalog.
- Text fields have server-side length limits.
- Email and CTA URL formats are validated server-side.
- No customer-provided filename or external resource is accepted in this task.

## Performance

- Dashboard uses bounded website retrieval (`take: 12`) for cards.
- Total website count and published count use indexed ownership/status queries.
- Website creation performs a single ownership-independent slug lookup followed by one insert.
- No new cache or queue infrastructure is introduced.

## Acceptance Criteria

- Authenticated user can open `/dashboard/websites/new`.
- Unauthenticated user is redirected to `/sign-in`.
- Business name, category and description are required.
- Optional business contact fields are persisted.
- User can choose one of the available starter templates.
- Invalid template keys are rejected server-side.
- Website is created with `DRAFT` status.
- Website belongs to the authenticated user.
- Website slug is unique.
- Dashboard shows the real website count and published count.
- Dashboard shows newly created website cards.
- A website card opens its authenticated setup/confirmation page.
- Another authenticated user cannot access the website confirmation page.
- Prisma schema validates.
- Migration applies cleanly.
- Existing authentication remains functional.
- No editor or publishing behavior is introduced.

## Verification

Run locally after pulling the branch:

```text
npm install
npm run lint
npx tsc --noEmit
npm run test
npx prisma validate
npx prisma generate
npx prisma migrate status
npm run build
npm run cloudflare:build
```

Manual flow:

1. Sign in.
2. Open `/dashboard`.
3. Click `Create website`.
4. Complete Quick Setup.
5. Select a starter template.
6. Create the website.
7. Confirm the website is stored as Draft.
8. Confirm the dashboard count changes to 1.
9. Confirm the created website appears in `My Websites`.
10. Open the website card.
11. Confirm the confirmation page shows the correct business and template.
12. Sign out.
13. Confirm the protected creation and confirmation routes redirect to `/sign-in`.

## Known Limitations

- The starter templates currently provide metadata only; they do not yet contain full page/section rendering definitions.
- The generated slug is intended as the future hosted-site identifier; custom domain and public rendering are separate tasks.
- Local and production database migration verification must be performed in the user's environment.
