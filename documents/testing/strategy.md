# Testing Strategy

TASK-001 does not introduce a new test runner because the smallest useful validation is static verification.

## Unit testing

Add a unit test runner when reusable business logic appears in `lib/` or `server/`.

## Component testing

Add component tests when interactive management components exist.

## Integration testing

Use integration tests for server actions, route handlers, database access, and storage boundaries once those features exist.

## E2E testing

Add E2E coverage for the full Choose → Customize → Preview → Publish flow after those screens exist.

## Database testing

Use Prisma validation now. Future database tests should run against isolated PostgreSQL test databases and should not use production credentials.

## Security testing

Run dependency audits and targeted authorization tests once authenticated and tenant-owned resources exist.
