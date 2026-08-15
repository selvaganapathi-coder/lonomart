# Security Architecture

Security is a cross-cutting requirement for every Lonomart feature.

## Customer data isolation

Every customer-owned resource must be authorized server-side through its ownership relationship. Client-supplied identifiers are never trusted as proof of access.

## Sensitive data

Do not expose database credentials, R2 private credentials, API keys, session secrets, or other private configuration to browser code.

## Required review areas

- Authentication
- Authorization
- Tenant/data isolation
- Input validation
- XSS
- CSRF where applicable
- SSRF where applicable
- File upload security
- Rate limiting
- Secret exposure
- Sensitive logging
- ID enumeration
- Public/draft data leakage

## Logging

Never log passwords, tokens, API keys, or private credentials. Avoid logging private customer content unnecessarily.
