# Scalability Assumptions

Target planning point: 10,000 registered users.

## Definitions

- Registered users: total accounts in the database.
- Active users: users performing management actions in a given period.
- Concurrent users: users actively interacting at the same time.
- Requests/sec: combined management and public traffic rate.
- Public traffic: anonymous visits to published websites, future work.
- Database workload: authenticated management writes and reads, future work.
- Asset storage: uploaded media stored in R2, future work.

## Assumptions

A single Next.js application, managed PostgreSQL, and Cloudflare/R2 are sufficient for the initial 10,000 registered-user target until measurements prove otherwise.

The project intentionally does not introduce Kubernetes, Kafka, Redis, microservices, sharding, or database clusters in TASK-001.
