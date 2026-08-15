# ADR-005 Cloudflare Deployment Architecture

## Context

The application should be deployable to Cloudflare using OpenNext while remaining usable locally.

## Problem

Deployment preparation is needed without fake production services or Workers-specific application code.

## Options

1. Add minimal OpenNext and Wrangler configuration.
2. Leave deployment undefined.
3. Add full Cloudflare bindings immediately.

## Decision

Add minimal `open-next.config.ts` and `wrangler.jsonc` without production bindings.

## Reason

This prepares validation while keeping local development portable.

## Consequences

Actual Cloudflare account settings, secrets, and R2 bindings must be configured outside source control later.
