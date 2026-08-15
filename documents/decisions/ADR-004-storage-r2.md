# ADR-004 — Cloudflare R2 for Customer Assets

## Context

Customer websites require image and other asset storage. Large binaries should not be stored in PostgreSQL.

## Decision

Use Cloudflare R2 for customer-uploaded assets and PostgreSQL for asset metadata and ownership relationships.

## Reason

R2 is aligned with the product's Cloudflare infrastructure and provides object storage without putting binary payloads into the transactional database.

## Consequences

Asset access must remain ownership-aware. Direct browser uploads may be used where appropriate so large files do not unnecessarily pass through the application server.
