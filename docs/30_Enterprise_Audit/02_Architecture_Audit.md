# Repository Architecture Audit

Score: 58/100

## Evidence Reviewed

- Root workspace layout: `apps/*`, `services/*`, and `packages/*` in `pnpm-workspace.yaml`.
- Build orchestration: `turbo.json` defines `build`, `dev`, `lint`, and `test`.
- Major folders: `apps`, `services`, `packages`, `docs`, `deployment`, `archive`, `scripts`, `tools`.
- Backend folder structure exists under `services/hos-api/src` with `audit`, `auth`, `common`, `config`, `core`, `database`, `filters`, `guards`, `health`, `logging`, `security`, and `shared`.

## Strengths

- Monorepo boundaries are clear at the top level.
- Backend infrastructure is grouped by platform concern rather than mixed into feature code.
- `services/hos-api/src/app.module.ts` imports `CoreModule`, `HealthModule`, and `IdentityModule`, avoiding accidental business modules in the API root.
- Documentation exists for blueprint, roadmap, DDD, business architecture, engineering handbook, capability model, and ADR.

## Violations and Risks

| Severity | Location | Finding | Recommended Fix | Priority | Effort |
| --- | --- | --- | --- | --- | --- |
| High | `packages/*/package.json` | Several shared packages are reserved foundations with no meaningful implementation or integration. This weakens package isolation and makes the workspace look more complete than it is. | Either implement shared contracts deliberately or mark packages as future-reserved in governance docs. | P1 | M |
| High | `archive/` | Archive contains legacy, mock, and patient workspace code inside the active repository. It increases source-of-truth ambiguity and audit surface. | Move archives outside the production repo or quarantine them with explicit exclusion policy. | P1 | M |
| Medium | `turbo.json` | Turbo tasks have minimal dependency/env inputs and no coverage, security, or CI-oriented tasks. | Add deterministic inputs, env policy, coverage task, typecheck task, and CI task graph. | P2 | M |
| Medium | root inventory files | Files such as `source-tree.txt`, `services-tree.txt`, `git-status.txt`, and `empty-files.txt` are generated evidence artifacts committed into root. | Move generated inventories to documentation/audit output or ignore transient files. | P2 | S |
| Medium | `services/hos-api/src/database/interfaces` and `services/hos-api/src/database/repositories` | Duplicate database abstraction families exist, creating future drift risk. | Consolidate into one canonical persistence contract namespace. | P2 | M |

## Architecture Assessment

The repository is organized enough to continue enterprise platform engineering. It is not yet at a governance level where package boundaries, deployment boundaries, and generated artifacts are fully controlled.

