# TASK-006 — Website Renderer & Preview Foundation

**Type:** Feature
**Priority:** P0
**Status:** IN_PROGRESS

## Objective
Render the versioned website structure created by TASK-005 as a responsive draft website preview without coupling the renderer to the future editor.

## Scope
- Typed renderable website/page/section data.
- Section renderer registry for current section types.
- Responsive website renderer.
- Authenticated draft preview route.
- Page selection through the preview query string.
- Safe fallback for unknown section types.
- Link from website setup to preview.

## Non-scope
- Visual editor.
- Drag and drop.
- Inline editing.
- Publishing.
- Public website routing.
- Custom domains.
- Advanced SEO.

## Acceptance criteria
1. An authenticated owner can open a draft website preview.
2. A non-authenticated visitor is redirected to sign-in.
3. A user cannot preview another user's website by changing the website ID.
4. The selected page renders its ordered visible sections.
5. Existing section types render structured content without editor-only dependencies.
6. Unknown section types fail safely with a non-sensitive fallback.
7. Preview is responsive on desktop and mobile widths.
8. The setup page provides a preview action.

## Security
Preview data is fetched server-side using both the requested website ID and the authenticated user's ID. Draft data is not exposed through a public route.

## Performance
The preview performs one ownership-scoped website query with pages and sections. Section rendering is server-rendered and uses no client-side editor state.
