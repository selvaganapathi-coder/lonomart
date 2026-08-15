# ADR-004 R2 Storage Architecture

## Context

Cloudflare R2 is the planned object store for uploaded and published assets.

## Problem

Asset security and tenant isolation must be defined before upload features exist.

## Options

1. Document the boundary now and implement later.
2. Add R2 bindings and upload code now.
3. Use public object keys provided by clients.

## Decision

Document the R2 boundary now with server-generated object keys and no runtime R2 code.

## Reason

The task is foundation only, and upload code would create business behavior too early.

## Consequences

Future uploads must authorize ownership before issuing direct upload URLs.
