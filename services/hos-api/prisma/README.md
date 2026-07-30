# JUTH HOS Prisma Platform

The Prisma platform is configured for PostgreSQL with an empty business schema.

Folders:

- `schema/` contains the Prisma schema.
- `migrations/` contains migration history and migration strategy.
- `seed/` contains the seed runner and seed contracts.
- `extensions/` contains future Prisma extension boundaries.

The schema intentionally contains no Patient, Staff, Pharmacy, Laboratory, Billing, or other business entities.
