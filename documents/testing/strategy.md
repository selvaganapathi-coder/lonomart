# Testing Strategy

## Test layers

- Unit tests for pure domain utilities and validation.
- Component tests for important management UI behavior.
- Integration tests for database/server operations.
- End-to-end tests for critical customer workflows.
- Build/type/lint checks for every implementation task.

## MVP critical flows

Authentication, website creation, template instantiation, structured editing, preview, publishing, tenant isolation, and public draft/published separation require regression coverage.

## Current state

TASK-001 establishes the test command convention but no test suite is claimed as implemented or passing until dependencies are installed and the tests are executed.
