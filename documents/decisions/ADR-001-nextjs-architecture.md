# ADR-001 — Next.js 16 Application Architecture

## Context

The repository was created with Next.js 16.3.1 and the App Router.

## Problem

Whether to downgrade to Next.js 15 or retain the existing version.

## Options

1. Downgrade to Next.js 15.
2. Retain Next.js 16.3.1.

## Decision

Retain Next.js 16.3.1.

## Reason

The repository already uses Next.js 16.3.1, and OpenNext for Cloudflare currently supports Next.js 16. A downgrade would introduce unnecessary migration work without a demonstrated product or infrastructure benefit.

## Consequences

Agents must follow the repository's Next.js 16 guidance and verify version-specific behavior before implementing framework-sensitive code.
