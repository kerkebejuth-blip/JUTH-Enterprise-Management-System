# Contributing to JUTH HOS

## Purpose

This document defines the minimum contribution workflow for the JUTH Enterprise Hospital Operating System.

## Engineering Gates

Before opening a pull request, run:

1. `pnpm install`
2. `pnpm lint`
3. `pnpm typecheck`
4. `pnpm build`
5. `pnpm test`

## Development Rules

- Follow the JUTH Enterprise Architecture & Development Constitution.
- Do not introduce business modules outside an approved sprint.
- Keep changes scoped, reviewable, and documented.
- Create or update ADRs only when an architectural decision is being made.
- Do not bypass workspace boundaries or shared platform contracts.

## Pull Requests

Pull requests must include validation evidence, affected areas, risk notes, and documentation updates where applicable.

