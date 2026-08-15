# Publishing Architecture

Publishing will separate draft state from public state.

```text
Draft
  ↓
Validate
  ↓
Create immutable publication version
  ↓
Atomically make current
  ↓
Invalidate/update public cache
```

Public visitors must only receive published state. Failed publishing must not replace the previous successful publication.

Rollback UI is not an MVP requirement, but the publication model must preserve the ability to support rollback later.
