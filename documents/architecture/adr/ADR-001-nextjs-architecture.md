# ADR-001 Next.js Architecture

## Context

The project uses Next.js 16.3.1, React 19, TypeScript, and the App Router.

## Problem

The foundation needs a portable application structure before business features are built.

## Options

1. Keep the App Router at the repository root.
2. Move to a `src/` structure immediately.
3. Split into multiple applications.

## Decision

Keep the App Router at the repository root and add only directories with immediate purpose.

## Reason

The current project already uses root `app/`, and minimal structure reduces churn while preserving future flexibility.

## Consequences

Future tasks can add `components/`, `lib/`, or `server/` when actual code requires them.
