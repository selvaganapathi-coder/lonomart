# Database Architecture

## Database

PostgreSQL is the system of record for transactional Lonomart data.

## ORM

Prisma ORM is the database access and migration layer. The repository uses the Prisma 7 configuration model with `prisma.config.ts` as the CLI datasource configuration.

## Authentication

Better Auth owns the authentication records stored in PostgreSQL: users, sessions, accounts and verification records.

## Website project model

`Website` is the customer-owned project boundary. A Website belongs to exactly one User and contains the project identity, lifecycle state, selected template key/version and Quick Setup business profile.

## Website structure

TASK-005 adds two customer-owned structural layers:

```text
Website
  └── WebsitePage
        └── WebsiteSection
```

`WebsitePage` stores page identity and ordering:

- `slug`
- `title`
- `description`
- `sortOrder`
- `isHome`

`WebsiteSection` stores the editable structured content boundary:

- `type`
- `version`
- `sortOrder`
- `visible`
- `content` JSON

Foreign keys cascade from Website to Page and Page to Section.

## Template relationship

Template definitions are currently code-managed and versioned by `key` + `version`. When a Website is created, the selected definition is instantiated into WebsitePage and WebsiteSection records.

This is intentional: an existing customer website must not depend on a mutable master definition at render time.

## Indexing

Website queries are primarily ownership-scoped. The schema includes:

- unique `slug` for future hosted-site lookup
- `userId` index for ownership queries
- `(userId, status)` index for dashboard status counts
- `(websiteId, slug)` unique index for page identity
- `(websiteId, sortOrder)` index for ordered page retrieval
- `pageId` index for section retrieval
- `(pageId, sortOrder)` index for ordered section retrieval

## Integrity principles

- Use version-controlled migrations.
- Define foreign-key behavior intentionally.
- Enforce ownership relationships server-side.
- Add indexes based on actual query patterns.
- Avoid premature over-normalization.
- Do not perform destructive production migrations without explicit approval.
- Do not trust customer-supplied owner identifiers.
- Do not allow mutable template definitions to silently alter existing WebsitePage or WebsiteSection records.
