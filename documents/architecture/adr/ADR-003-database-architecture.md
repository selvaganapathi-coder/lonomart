# ADR-003 Database Architecture

## Context

The stack requires PostgreSQL and Prisma.

## Problem

The project needs database tooling without prematurely modeling business entities.

## Options

1. Configure Prisma with no models yet.
2. Add likely User and Website tables immediately.
3. Delay database configuration.

## Decision

Configure Prisma with a PostgreSQL datasource and no models.

## Reason

This validates the database foundation while avoiding speculative schema design.

## Consequences

Future tasks must add models and migrations when requirements are concrete.
