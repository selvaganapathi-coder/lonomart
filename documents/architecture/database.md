# Database Architecture

## Database

PostgreSQL is the system of record for transactional Lonomart data.

## ORM

Prisma ORM is the database access and migration layer. The repository uses the Prisma 7 configuration model with `prisma.config.ts` as the CLI datasource configuration.

## Authentication

Better Auth owns the authentication records stored in PostgreSQL: users, sessions, accounts and verification records.

## Website project model

TASK-004 introduces the first customer-owned business entity: `Website`.

A Website belongs to exactly one User and contains the minimum project state required to start the website-building workflow:

- identity (`id`, `name`, `slug`)
- lifecycle (`status`)
- starter template reference (`templateKey`, `templateVersion`)
- Quick Setup data (`businessProfile` JSON)
- timestamps

The `businessProfile` JSON is intentionally scoped to the Quick Setup payload. It avoids premature normalization while the final template/page/section schemas are not yet implemented.

## Indexing

Website queries are primarily ownership-scoped. The schema therefore includes:

- unique `slug` for future hosted-site lookup
- `userId` index for ownership queries
- `(userId, status)` index for dashboard status counts

Dashboard list retrieval is bounded so a large website collection cannot create an unbounded initial payload.

## Integrity principles

- Use version-controlled migrations.
- Define foreign-key behavior intentionally.
- Enforce ownership relationships server-side.
- Add indexes based on actual query patterns.
- Avoid premature over-normalization.
- Do not perform destructive production migrations without explicit approval.
- Do not trust customer-supplied owner identifiers.

## Future schema layers

The full website architecture will later add template versions, pages, sections, assets, draft state and publication versions. Those entities should be introduced as separate vertical slices after their schemas are defined.
