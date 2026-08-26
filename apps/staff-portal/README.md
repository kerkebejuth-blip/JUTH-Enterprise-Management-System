# JUTH HOS Staff Portal

The Staff Portal is the current React enterprise application shell for JUTH HOS. It provides shared navigation, layout, theme, error handling, platform preview, and future clinical workspace extension points. It does not implement Patient registration or clinical workflows.

## Start Locally

From the repository root:

```powershell
pnpm --filter staff-portal dev
```

Open [http://localhost:5173](http://localhost:5173).

Start the backend in a second terminal:

```powershell
pnpm --filter hos-api start:dev
```

The API listens on `http://localhost:3000`. The platform health endpoint is `http://localhost:3000/health`; future application APIs use `http://localhost:3000/api/v1`; Swagger is available at `http://localhost:3000/docs` when enabled.

## Environment

Development uses:

```text
VITE_API_BASE_URL=http://localhost:3000
```

This value is a public browser base URL, not a secret. Do not place credentials or tokens in Vite environment files.

The backend already enables the approved development CORS configuration. A Vite proxy is not required for the current health-only integration.

## Frontend Boundaries

The dependency direction is:

```text
UI components
  -> feature/application boundary
  -> typed API client
  -> versioned HOS API
  -> backend application layer
  -> domain layer
  -> infrastructure
```

Frontend code must not import backend domain classes, Prisma clients, database models, or infrastructure adapters. The [API client](src/app/api/api-client.ts) is the browser transport boundary and unwraps only the approved enterprise response envelope.

## Existing Routes

- `/` is the platform dashboard and backend health preview.
- `/workspace` is the existing Enterprise Patient Workspace shell.
- The remaining navigation entries are explicit extension points and contain no business workflow.

The Patient Workspace is shared infrastructure. Future specialties extend it through approved feature boundaries; they do not replace the application shell.

## Adding a Feature

1. Obtain an approved domain blueprint and sprint scope.
2. Add a feature folder under `src/modules/<bounded-context>`.
3. Keep API calls in a typed service or application boundary.
4. Map API DTOs into view models; do not render raw backend entities.
5. Provide loading, error, empty, keyboard, and accessible states.
6. Register routes through the existing router and inherit `MainLayout`.
7. Add focused unit or component tests and update the relevant documentation.

## Quality Gates

```powershell
pnpm --filter staff-portal lint
pnpm --filter staff-portal typecheck
pnpm --filter staff-portal build
pnpm --filter staff-portal test
```

The portal is designed for fast startup, bounded API requests, progressive route loading, minimal navigation, and safe future integration with the Digital Patient Folder.
