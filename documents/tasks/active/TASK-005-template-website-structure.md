# TASK-005 — Template & Website Structure

**Type:** Feature  
**Priority:** P0  
**Status:** IN_PROGRESS

## Objective

Establish the versioned, schema-driven website structure that sits between a selected template and the future editor/public renderer.

## Product Outcome

```text
Website
  ↓
Template Definition + Version
  ↓
Pages
  ↓
Sections
  ↓
Structured Content
```

A website created from Quick Setup must receive its own page and section instances. Template definitions remain immutable source definitions; customer website records are independent instances.

## Scope

- Versioned template definitions in code.
- Website page model.
- Website section model.
- Page ordering and homepage designation.
- Section ordering, visibility and schema version.
- Structured JSON section content.
- Server-side template/version validation.
- Atomic website + page + section instantiation using Prisma nested create.
- Secure authenticated website structure reads.
- Basic structure display on the existing website setup page.
- Contract tests for template definitions.
- Prisma migration.

## Non-Scope

- Visual editor.
- Drag-and-drop.
- Free-form layout controls.
- Asset management.
- Public website routing.
- Publishing.
- Custom domains.
- Advanced SEO.
- Theme editor.

## Architecture Decision

The first template master/version definitions remain code-managed because the template catalog is small and controlled during MVP. Each definition has an explicit `key` and `version`. Website instances copy the selected template's pages and sections into PostgreSQL, so later template changes do not mutate existing customer websites.

The database therefore stores website-owned `WebsitePage` and `WebsiteSection` records rather than referencing mutable template page records at render time.

## Database

Added:

- `WebsitePage`
- `WebsiteSection`

`WebsitePage` belongs to one Website and contains:

- slug
- title
- description
- sort order
- homepage flag

`WebsiteSection` belongs to one WebsitePage and contains:

- section type
- section schema version
- sort order
- visibility
- structured JSON content

Foreign keys cascade from Website → Page → Section.

Indexes support website page retrieval and ordered section retrieval.

## Security

- Template key and version are validated server-side.
- Website structure reads require an authenticated Better Auth session.
- Website reads are scoped by both website ID and authenticated user ID.
- No client-supplied owner identifier is trusted.
- Customer content remains in customer-owned records.

## Performance

- Website creation uses one Prisma nested write, providing transactional creation of the website and its page/section tree.
- Page and section queries are ordered at the database layer.
- Indexes support the common website → pages → sections access pattern.
- No new cache, queue, or distributed infrastructure is introduced.

## Acceptance Criteria

- Each starter template has an explicit version and page definition.
- Each starter template contains at least one homepage.
- Pages have stable slugs and deterministic ordering.
- Sections have explicit type, version, visibility and structured content.
- Creating a website creates its page and section instances atomically.
- Existing website data is not linked to mutable template definitions.
- Existing website creation continues to work.
- Existing authentication and ownership checks remain intact.
- The website setup page displays the instantiated page/section structure.
- Prisma schema validates.
- Migration applies cleanly.
- TypeScript passes.
- Tests pass.
- Production build passes.
- Cloudflare/OpenNext build passes.

## Verification

```text
npx prisma validate
npx prisma generate
npx prisma migrate status
npm run lint
npx tsc --noEmit
npm run test
npm run build
npm run cloudflare:build
```

Manual flow:

1. Sign in.
2. Create a new website.
3. Select a starter template.
4. Complete Quick Setup.
5. Create the website.
6. Open the resulting website setup page.
7. Confirm the expected pages exist.
8. Confirm each page has ordered sections.
9. Confirm section versions are displayed.
10. Confirm another user cannot access the structure by changing the website ID.

## Known Limitations

- Template definitions are code-managed during MVP rather than database-managed.
- Section content is structured JSON but not yet editable.
- No public renderer is exposed yet.
- Template migration tooling is not required until template definitions become customer-facing mutable versions.
