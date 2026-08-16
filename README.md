# Lonomart

Lonomart is a SaaS website creation and publishing platform focused on helping small businesses and individuals create a professional website in approximately 3–5 minutes.

## Core workflow

**Choose → Customize → Preview → Publish**

## Technology

- Next.js 16.3.1
- React 19.2.8
- TypeScript
- Ant Design
- Tailwind CSS 4
- PostgreSQL
- Prisma ORM
- Cloudflare Workers / OpenNext
- Cloudflare R2

## Development

Install dependencies:

```bash
npm install
```

Start development:

```bash
npm run dev
```

Run linting:

```bash
npm run lint
```

Run tests:

```bash
npm test
```

## Database

Set `DATABASE_URL` in the local environment before running Prisma database commands.

```bash
npm run db:generate
npm run db:migrate
npm run db:studio
```

## Cloudflare

OpenNext provides the Cloudflare deployment adapter.

```bash
npm run cloudflare:build
npm run cloudflare:preview
npm run cloudflare:deploy
```

Cloudflare credentials, database URLs, R2 credentials, and other secrets must never be committed.

## Documentation

Project engineering documentation lives under [`documents/`](./documents/).

## MVP scope

The first release focuses on authentication, website creation, templates, quick setup, structured editing, preview, publishing, public websites, basic SEO, and basic project management.

Advanced editor capabilities, e-commerce, custom domains, AI generation, collaboration, and other roadmap features are intentionally deferred.
