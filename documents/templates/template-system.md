# Template System

## Purpose

Templates are reusable website starting structures. A template master must never be mutated by one customer's website.

## Current MVP architecture

```text
Code-managed Template Definition
          ↓
       key + version
          ↓
     Website creation
          ↓
Customer-owned WebsitePage records
          ↓
Customer-owned WebsiteSection records
```

The current starter catalog contains:

- Professional Services v1
- Local Business v1
- Restaurant v1

## Template definition

A template definition provides:

- identity
- category
- description
- version
- pages
- page ordering
- homepage designation
- section types
- section schema versions
- initial structured content

## Website instance

Website creation copies the selected definition into customer-owned records. After instantiation, the customer's page/section structure is independent of future changes to the master definition.

## Versioning rule

A template version is immutable for an instantiated website. A future template update must create a new version rather than silently changing the existing definition used by customer sites.

## Future evolution

If the catalog becomes sufficiently large or requires non-developer template management, template masters can move into PostgreSQL as `Template` and `TemplateVersion` entities. That migration is not required for the current MVP.
