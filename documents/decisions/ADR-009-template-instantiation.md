# ADR-009 — Template Instantiation into Customer-Owned Structure

## Context

Lonomart needs reusable templates while ensuring one customer's edits cannot mutate another customer's website or the template master.

## Problem

A website that renders directly from a mutable master template could change unexpectedly when the master evolves. It would also make customer-specific editing difficult to isolate.

## Options

1. Render every website directly from a mutable template definition.
2. Copy the selected template structure into customer-owned page and section records at website creation.
3. Store all template masters and versions in PostgreSQL immediately.

## Decision

Use option 2 for the MVP.

Template definitions are code-managed and explicitly versioned. Website creation instantiates the selected version into `WebsitePage` and `WebsiteSection` records.

## Reason

- Strong customer isolation.
- Existing websites are stable when template masters change.
- Simple MVP implementation.
- Structured data is directly editable by the future editor.
- No premature template administration system.

## Consequences

Positive:

- Customer websites own their structure.
- Template changes do not silently mutate existing websites.
- Future editor and renderer can operate on one stable data model.

Trade-off:

- Template migrations must be explicit if an existing customer wants a new template version.
- Large template catalogs may eventually justify database-backed template master/version management.
