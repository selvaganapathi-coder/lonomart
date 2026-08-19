# TASK-011 — Draft Editing, Autosave and Revision Safety

**Status:** IN PROGRESS  
**Priority:** P0  
**Branch:** `agent/task-011-draft-autosave-revisions`

## Objective

Make structured website editing durable and safe for draft work by adding debounced autosave, explicit save state, optimistic concurrency, and revision history without changing the existing editor/renderer boundary.

## Scope

- Persist structured section changes automatically after the user pauses editing.
- Keep manual save available as a fallback.
- Expose clear save states to the editor.
- Prevent stale clients from overwriting newer section content.
- Keep section writes authenticated and ownership-scoped.
- Preserve successful section versions for revision safety and recovery.

## Implementation

### Database

- Added `WebsiteSection.revision` with default `0`.
- Added `WebsiteSectionRevision` with:
  - `websiteId`
  - `sectionId`
  - `revision`
  - `content`
  - `createdAt`
- Added unique constraint on `(sectionId, revision)`.
- Added indexes for website/revision history queries.

### API

Section PATCH now requires the client to send the expected revision.

The server performs an ownership-scoped atomic check using the expected revision. On success it:

1. increments the section revision;
2. persists the new structured content;
3. creates a revision-history record.

If the expected revision is stale, the API returns:

```text
409 REVISION_CONFLICT
```

The stale request therefore cannot overwrite the newer saved content.

### Editor

- Debounced autosave after editing pauses.
- Save-state feedback for unsaved, saving, saved and failed/conflict states.
- Manual save fallback.
- Revision-aware save requests.
- Successful server revision becomes the editor's current revision.

## Security

- Authentication is required for section writes.
- Website ownership is checked server-side through the page/website relationship.
- Client-supplied user/owner identifiers are not trusted.
- Revision checks are performed server-side.

## Verification

Passed locally:

- `npm run lint`
- `npx tsc --noEmit`
- `npm run test`
- `npx prisma validate`
- `npx prisma migrate status`
- Autosave persistence and refresh recovery.
- Revision conflict protection with stale section state.

## Acceptance Criteria

- [x] Draft section changes persist without requiring an explicit save click.
- [x] Rapid edits settle to the latest saved value.
- [x] Saved content survives refresh.
- [x] Stale revisions cannot overwrite newer content.
- [x] Revision conflicts return HTTP 409.
- [x] Successful saves create revision history.
- [x] Section mutations remain ownership-scoped.
- [x] Existing renderer/editor separation remains intact.

## Remaining

- Run full CI on the PR.
- Review the final diff before merge.
- Move this task to `documents/tasks/completed/` after the PR is merged.
