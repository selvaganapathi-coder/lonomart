# Storage Architecture

Cloudflare R2 is the planned object storage system for customer assets.

Application data such as asset ownership, metadata, object keys, and relationships belongs in PostgreSQL. Binary assets should not be stored in PostgreSQL.

Planned object-key convention:

```text
websites/{websiteId}/assets/{assetId}/{filename}
```

Customer-controlled filenames are not authorization boundaries. Every asset operation must verify the owning website server-side.

TASK-001 establishes the architectural boundary only. Actual R2 credentials, bucket bindings, upload flows, and image-processing limits will be implemented when the asset vertical slice is scheduled.
