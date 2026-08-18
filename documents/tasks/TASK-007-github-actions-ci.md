# TASK-007 — GitHub Actions CI

## Objective

Automate the repeatable validation currently performed manually for every Lonomart task and pull request.

## CI contract

Pull requests targeting `master` and pushes to `master` run the same validation job:

1. Install dependencies with `npm ci`.
2. Run ESLint.
3. Run TypeScript type checking.
4. Run Vitest.
5. Validate the Prisma schema.
6. Generate Prisma Client.
7. Run the production Next.js build.
8. Run the Cloudflare/OpenNext build.

## Environment

CI uses Node.js 22 and npm's lockfile-based installation. Prisma commands receive a non-production `DATABASE_URL` so schema/config validation and client generation do not require access to the production database.

CI does not run `prisma migrate dev`, `prisma migrate deploy`, or any production database mutation.

## Trigger policy

- `pull_request` targeting `master`
- `push` to `master`

Concurrent runs for the same ref are cancelled when superseded.

## Acceptance criteria

- A pull request automatically receives a CI status.
- A failed validation step fails the job.
- The workflow does not require production credentials.
- The workflow does not mutate a database.
- The workflow uses the committed lockfile through `npm ci`.
- Production and Cloudflare/OpenNext builds are covered by CI.
