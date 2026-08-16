# ADR-005 — Cloudflare Deployment with OpenNext

## Context

Lonomart is intended to run on Cloudflare while retaining the existing Next.js application model.

## Decision

Use `@opennextjs/cloudflare` as the deployment adapter and Wrangler for Cloudflare Workers tooling.

The application should use the Node.js runtime model supported by OpenNext rather than designing around Next.js Edge Runtime limitations.

## Reason

OpenNext for Cloudflare currently supports Next.js 16 and provides the intended build/deploy path for Next.js applications on Cloudflare.

## Consequences

Cloudflare deployment must be validated with the exact dependency versions used by the repository before production deployment. Cloudflare-specific bindings and secrets must remain environment/deployment configuration, not source-controlled credentials.
