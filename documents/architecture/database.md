# Database Architecture

## Actual implementation

Prisma is configured for PostgreSQL with a Prisma 7 configuration file. The schema declares the PostgreSQL provider and no application models. `prisma.config.ts` points the Prisma CLI at `prisma/schema.prisma`, declares the future migration path, and reads the datasource URL from `process.env.DATABASE_URL`.

## Environment

- `DATABASE_URL`: required for Prisma commands that need database connectivity and future application database access.
- `DIRECT_DATABASE_URL`: reserved for future migration workflows if a pooled URL is used for runtime traffic.

Secrets must live in local `.env*` files or deployment secret stores and must never be committed.

## Future migration approach

Future tasks should add models only when the product workflow requires them, then create migrations with Prisma. Tenant-owned records must include ownership fields and authorization checks at the server boundary.
