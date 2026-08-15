# System Overview

## Actual implementation

- Next.js 16.3.1 App Router application.
- React 19 with TypeScript.
- Tailwind CSS 4 global styling.
- Ant Design ConfigProvider boundary in `app/providers.tsx` for the Lonomart management application only.
- Prisma schema configured for PostgreSQL without business models.
- OpenNext Cloudflare configuration files added for deployment preparation.

## Intended boundaries

- `app/`: route tree and global providers.
- `prisma/`: database schema and future migrations.
- `documents/`: product, architecture, testing, and progress records.

No empty `components/`, `lib/`, or `server/` folders are created yet because there is no immediate code to place there.
