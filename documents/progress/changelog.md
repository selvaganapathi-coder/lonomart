# Changelog

## 2026-08-15

- Replaced the Create Next App starter page with a Lonomart foundation page.
- Added an Ant Design ConfigProvider boundary for the management application.
- Added Prisma PostgreSQL schema foundation without business models.
- Added minimal OpenNext Cloudflare and Wrangler configuration.
- Added product, architecture, ADR, testing, backlog, and progress documentation for TASK-001.
- Aligned Ant Design, Prisma, and OpenNext package declarations to current releases discovered during PR fix validation.
- Added `prisma.config.ts` so Prisma 7 reads `DATABASE_URL` from environment configuration outside `schema.prisma`.
- Recorded that registry access prevents regenerating `package-lock.json` and completing clean validation in this environment.
