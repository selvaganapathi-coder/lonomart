# ADR-003 — PostgreSQL and Prisma

## Context

Lonomart requires durable relational data for accounts, websites, templates, pages, sections, assets, and publication state.

## Decision

Use PostgreSQL as the system of record and Prisma ORM for schema management, migrations, and typed database access.

The project uses Prisma ORM 7's `prisma.config.ts` configuration model.

## Reason

The product has relational ownership, ordering, versioning, and publication requirements. PostgreSQL provides the required transactional and relational guarantees while Prisma provides type-safe access for TypeScript.

## Consequences

Business models will be introduced incrementally with vertical slices. TASK-001 intentionally creates no business tables.
