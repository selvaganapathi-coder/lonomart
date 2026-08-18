# TASK-010 — Asset Management and Cloudflare R2 Integration

## Status

**IN_PROGRESS**

## Branch

`agent/task-010-editor-preview-sync`

## Purpose

Add the first production asset-storage boundary for Lonomart. Website images are owned by a website, stored in Cloudflare R2, and tracked in PostgreSQL so editor and future publishing workflows can reference durable asset records.

## Scope

- `WebsiteAsset` database model.
- Prisma migration for website assets.
- Cloudflare R2 bucket binding.
- R2 storage adapter using the OpenNext Cloudflare binding API.
- Authenticated, ownership-scoped asset list/upload API.
- Authenticated, ownership-scoped asset read/delete API.
- Image validation and 10 MB upload limit.
- Website asset library UI.
- Editor → Assets navigation.
- Cloudflare binding support during local `next dev` through OpenNext initialization.

## Supported Assets — v1

Only these image content types are accepted:

- `image/jpeg`
- `image/png`
- `image/webp`

Maximum size: **10 MB per asset**.

## Storage Key

```text
users/{userId}/websites/{websiteId}/assets/{assetId}/{filename}
```

The storage key is generated server-side. Client-provided owner IDs and object keys are never trusted.

## Data Model

```text
Website
  ↓
WebsiteAsset
  ├── objectKey
  ├── filename
  ├── contentType
  ├── size
  └── etag
```

Deleting a website cascades to its asset metadata. R2 object deletion is handled explicitly by the asset delete endpoint.

## Security

Every asset operation requires an authenticated Better Auth session and verifies that the requested website belongs to the authenticated user. Asset object keys are never accepted from the client for read/delete operations.

## Public Access Boundary

The current asset read endpoint is authenticated and intended for the dashboard/editor. Public asset delivery for published websites is intentionally deferred to the publication/public-renderer work so private draft assets are not accidentally exposed.

## Non-Goals

- Public asset URLs.
- Image transformations/resizing.
- CDN/custom asset domains.
- Drag-and-drop upload.
- Asset folders/tags.
- Video/audio/document storage.
- Image insertion into every section field.
- Publishing.

## Verification

Required before completion:

- Prisma validate.
- Prisma generate.
- Migration status.
- Lint.
- TypeScript.
- Tests.
- Next.js production build.
- Cloudflare/OpenNext build.
- Desktop asset-library verification.
- Mobile asset-library verification.
- Upload/list/read/delete verification with the R2 binding.
- Cross-user ownership verification.

## Completion Rule

TASK-010 is not complete until the full verification suite passes and task documentation, current-state, backlog, and changelog are synchronized before PR merge.
