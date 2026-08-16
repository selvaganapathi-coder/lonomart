# System Overview

## Current repository

Lonomart currently uses Next.js 16.3.1, React 19.2.8, TypeScript, and Tailwind CSS 4. The repository is a fresh App Router application.

## Target architecture

```text
                    LONOMART
                       |
          +------------+------------+
          |                         |
   Management App            Public Websites
          |                         |
      Next.js                 Cloudflare Edge
          |                         |
   +------+-------+          Published State
   |              |                |
 Database       R2 Assets        Cache
```

The management application owns authenticated customer operations. Public websites consume published website state only.

## Technology baseline

- Next.js 16.3.1
- React 19.2.8
- TypeScript
- Ant Design for the management UI
- Tailwind CSS for utility/layout needs
- PostgreSQL
- Prisma ORM
- Cloudflare Workers via OpenNext
- Cloudflare R2 for object storage

## Important boundary

Ant Design is for the Lonomart management application. Customer-facing websites use the Lonomart template renderer and are not coupled to the Ant Design visual system.
