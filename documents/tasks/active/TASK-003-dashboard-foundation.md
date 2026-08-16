# TASK-003 — User Dashboard Foundation

**Type:** Feature  
**Priority:** P1  
**Status:** IN_PROGRESS

## Objective

Establish the authenticated Lonomart management dashboard so a user can immediately understand their website workspace and see the primary path to creating a website.

## Business Value

The dashboard is the first management surface after authentication. It must answer two questions immediately:

1. What websites do I have?
2. How do I create one?

## Scope

- Authenticated dashboard shell
- Lonomart dashboard header
- Authenticated user greeting
- My Websites section
- Empty state for users without websites
- Create Website CTA
- Existing sign-out control
- Responsive layout using existing Tailwind + Ant Design architecture
- Server-side Better Auth session protection

## Non-Scope

- Website database model
- Website creation workflow
- Template catalog or selection
- Quick Setup
- Pages
- Sections
- Editor
- Assets
- Preview
- Publishing
- Custom domains
- Billing
- Analytics

## Database Impact

None. TASK-003 intentionally does not introduce the Website model. Website persistence will be implemented in a later task.

## Security

The dashboard continues to use the existing server-side Better Auth session boundary. Unauthenticated requests redirect to `/sign-in`. No client-supplied user identifier is trusted.

## Acceptance Criteria

- Authenticated users can load `/dashboard`.
- Unauthenticated users are redirected to `/sign-in`.
- The dashboard displays the authenticated user's available name.
- A `My Websites` section is visible.
- A clear `Create Website` CTA is visible but does not introduce website-creation scope.
- A useful empty state is shown when the user has no websites.
- Existing sign-out functionality remains available.
- Dashboard is responsive on mobile and desktop.
- Existing Ant Design client-boundary wrappers are used for Typography components.
- No database migration is required.

## Verification

Run locally:

```text
npm run lint
npx tsc --noEmit
npm run test
npm run build
npm run cloudflare:build
```

Manual checks:

1. Sign in.
2. Open `/dashboard`.
3. Confirm the dashboard renders without a runtime error.
4. Confirm the authenticated user's name is displayed.
5. Confirm `My Websites` and the empty state are visible.
6. Sign out.
7. Open `/dashboard` while signed out and confirm redirect to `/sign-in`.

## Implementation Notes

The Create Website CTA is intentionally disabled in TASK-003. Website creation is a separate task and must not be implemented implicitly through the dashboard foundation.
