# Database Architecture

## Database

PostgreSQL is the planned system of record for transactional Lonomart data.

## ORM

Prisma ORM is the database access and migration layer. The repository uses the Prisma 7 configuration model with `prisma.config.ts` as the CLI datasource configuration.

## Initial schema policy

TASK-001 intentionally does not create business tables. Authentication, website, template, page, section, asset, and publication models will be introduced with their respective vertical slices after the domain requirements are defined.

## Integrity principles

- Use version-controlled migrations.
- Define foreign-key behavior intentionally.
- Enforce ownership relationships server-side.
- Add indexes based on actual query patterns.
- Avoid premature over-normalization.
- Do not perform destructive production migrations without explicit approval.
