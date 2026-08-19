# TASK-012 — Publication Model and Publish Workflow

**Status:** IN PROGRESS  
**Priority:** P0  
**Branch:** `agent/task-012-publish-workflow`

## Objective

Create a durable separation between the editable website draft and the currently published website state, with authenticated publish, re-publish, and unpublish operations.

## Scope

- Track the current editable draft generation on `Website`.
- Persist the current published website as a versioned snapshot.
- Publish the current draft atomically within a database transaction.
- Keep subsequent draft edits isolated from the published snapshot.
- Support re-publishing as the next publication version.
- Support unpublishing the current publication.
- Expose publish state and unpublished-change state in the editor.
- Preserve ownership checks for all publication mutations.

## Data Model

### Website

Adds:

- `draftRevision Int @default(0)`

Each successful revision-safe section save increments the website draft revision.

### WebsitePublication

Stores the current published snapshot:

- `websiteId` — unique relation to the website.
- `version` — publication version number.
- `publishedDraftRevision` — draft generation captured by this publication.
- `snapshot` — structured website/page/section JSON snapshot.
- `publishedAt` — publication timestamp.
- `updatedAt` — record update timestamp.

There is one current publication per website. Re-publishing replaces that current publication with the next version.

## Publish Workflow

```text
Editable Website
      ↓
WebsitePage / WebsiteSection
      ↓
Current draftRevision
      ↓
POST /api/websites/:websiteId/publish
      ↓
Ownership check
      ↓
Snapshot current draft
      ↓
Create/update WebsitePublication
      ↓
Set Website.status = PUBLISHED
```

Draft records remain editable after publication. They are not replaced by the publication snapshot.

## Unpublish Workflow

```text
DELETE /api/websites/:websiteId/publish
      ↓
Ownership check
      ↓
Delete current WebsitePublication
      ↓
Set Website.status = DRAFT
```

## Revision Semantics

`WebsitePublication.publishedDraftRevision` identifies the draft generation represented by the published snapshot.

If:

```text
Website.draftRevision !== WebsitePublication.publishedDraftRevision
```

then the website has unpublished draft changes.

## Security

- Requires an authenticated Better Auth session.
- Requires website ownership through `session.user.id`.
- Client input cannot select another user's website.
- Publication snapshots are created server-side from database state.
- The public renderer must consume the publication boundary in TASK-013 rather than editable draft records.

## Acceptance Criteria

- [ ] A draft website can be published.
- [ ] Publishing creates a durable publication snapshot.
- [ ] The published snapshot remains unchanged when later draft edits occur.
- [ ] Re-publishing creates the next publication version.
- [ ] Unpublishing removes the current publication and returns the website to DRAFT.
- [ ] Unpublished changes are visible in the editor state.
- [ ] Unauthorized publication attempts are rejected.
- [ ] Cross-user publication attempts are rejected.
- [ ] Prisma migration is applied successfully.
- [ ] Lint passes.
- [ ] TypeScript passes.
- [ ] Tests pass.
- [ ] CI Cloudflare/OpenNext build passes.

## Verification Plan

1. Create a draft website.
2. Publish it.
3. Confirm `WebsitePublication` exists with version `1`.
4. Edit a section and autosave.
5. Confirm `draftRevision` increases while the publication snapshot remains unchanged.
6. Publish again and confirm version `2` captures the latest draft.
7. Unpublish and confirm the publication is removed and website status becomes `DRAFT`.
8. Verify a different authenticated user cannot publish or unpublish the website.
