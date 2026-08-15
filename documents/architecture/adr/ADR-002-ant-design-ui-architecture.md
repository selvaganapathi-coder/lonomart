# ADR-002 Ant Design UI Architecture

## Context

Lonomart will need management UI components, but public customer websites should remain independent.

## Problem

Ant Design requires a client-side provider boundary in the App Router without coupling all future public pages to the design system.

## Options

1. Add Ant Design globally through a small provider boundary.
2. Avoid Ant Design until dashboard work.
3. Build a custom design system now.

## Decision

Add `app/providers.tsx` with `ConfigProvider` and use the Ant Design Next.js registry in the root layout.

## Reason

This establishes compatibility while avoiding a large design system.

## Consequences

Future public website routes must avoid importing management-only Ant Design components.
