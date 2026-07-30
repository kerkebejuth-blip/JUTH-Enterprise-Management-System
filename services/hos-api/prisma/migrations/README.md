# JUTH HOS Database Migration Strategy

Migration names must use:

`YYYYMMDDHHMMSS_descriptive_change_name`

Production migrations are applied with:

`pnpm --filter hos-api db:migrate:deploy`

Development migrations are created with:

`pnpm --filter hos-api db:migrate:dev --name descriptive_change_name`

Rollback strategy:

1. Prefer forward-only corrective migrations.
2. Restore from verified backup when destructive rollback is required.
3. Record incident, migration version, and restore point before recovery.
4. Re-run migration status after recovery.

No business tables are defined in Sprint 006.
