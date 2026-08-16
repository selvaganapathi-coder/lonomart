# ADR-002 — Ant Design for Management UI

## Context

Lonomart needs a professional management interface for non-technical customers while keeping the public website renderer independent.

## Decision

Use Ant Design as the primary component library for the Lonomart management application.

Use Tailwind CSS for utility/layout needs where it improves implementation clarity.

Customer-facing generated websites will use the Lonomart template renderer rather than Ant Design's visual component system.

## Reason

This gives the management application a consistent set of accessible, responsive primitives without coupling customer website output to the internal product UI.

## Consequences

Common management controls should use Ant Design before custom components are created. Custom UI is justified when the product interaction is specific to Lonomart and not adequately represented by Ant Design.
