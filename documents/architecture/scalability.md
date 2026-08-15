# Scalability

## Initial target

Design for approximately 10,000 registered users without requiring a major architectural rewrite.

Registered users are not equivalent to concurrent users. Capacity planning must distinguish registered users, active users, concurrency, request rate, public traffic, storage growth, and database workload.

## Preferred architecture

- Stateless Next.js application
- PostgreSQL
- Cloudflare edge delivery
- Cloudflare R2
- Efficient queries
- Selective caching
- Small payloads

## Explicit non-goals

Do not introduce microservices, Kubernetes, Kafka, database sharding, Redis, or complex queue infrastructure without measured requirements.

## Measurement checkpoints

Review capacity at 1,000, 5,000, and 10,000 registered users using production or realistic load-test measurements.

## Current measurement status

No load testing has been performed yet. No capacity target is claimed as verified.
