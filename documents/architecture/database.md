# Database Architecture

## Actual implementation

Prisma is configured with a PostgreSQL datasource using `env("DATABASE_URL")`. No application tables exist yet.

## Environment

- `DATABASE_URL`: required for Prisma and application database access.
- `DIRECT_DATABASE_URL`: reserved for future migration workflows if a pooled URL is used for runtime traffic.

Secrets must live in local `.env*` files or deployment secret stores and must never be committed.

## Future migration approach

Future tasks should add models only when the product workflow requires them, then create migrations with Prisma. Tenant-owned records must include ownership fields and authorization checks at the server boundary.
