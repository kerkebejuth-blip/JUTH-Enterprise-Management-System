# Frontend Architecture Audit

Score: 46/100

## Evidence Reviewed

- Staff portal package: `apps/staff-portal`.
- Routing: `apps/staff-portal/src/app/router/router.tsx`.
- Layout: `apps/staff-portal/src/app/layouts`.
- Patient workspace: `apps/staff-portal/src/modules/patient-workspace`.
- Shared packages: `packages/api`, `packages/ui`, `packages/types`.

## Strengths

- React Router is configured through `createBrowserRouter`.
- Application shell separates top bar, sidebar, breadcrumbs, and content outlet.
- Tooling dependencies include React Query, React Hook Form, Zod, Zustand, Storybook, Vitest, Playwright, and accessibility testing packages.
- Theme provider supports persisted/system theme selection.

## Findings

| Severity | Location | Finding | Architecture Impact | Recommended Fix | Priority | Effort |
| --- | --- | --- | --- | --- | --- | --- |
| High | `apps/staff-portal/src/app/router/router.tsx:12` | Root route renders `PatientWorkspacePage` while most other modules are reserved foundations. | Patient workflow appears to be the default app before backend patient context exists. | Make default route a governed shell/dashboard until patient module is authorized. | P1 | M |
| High | `apps/staff-portal/src/app/router/Placeholder.tsx:7` | Clinical and administrative routes are reserved foundations. | Feature module architecture is not yet implemented. | Define module loading contracts and replace reserved foundations through sprint-owned modules. | P2 | L |
| Medium | `apps/staff-portal/src/app/layouts/Sidebar.tsx` | Navigation is static and not tied to IAM roles/permissions. | Users may see unavailable or unauthorized capabilities. | Filter navigation from authorization claims and capability registry. | P1 | M |
| Medium | `apps/staff-portal/src/modules/patient-workspace/layouts/PatientWorkspaceLayout.tsx` | Layout uses fixed three-column grid. | Responsiveness risk on smaller viewports. | Add responsive layout rules and viewport verification. | P2 | M |
| Medium | `packages/api/src/interceptors/responseInterceptor.ts:11` | Shared interceptor contains `console.log("Refresh Token")`. | Logging noise and possible security drift in shared API layer. | Replace with structured telemetry or remove. | P2 | S |

## Frontend Conclusion

The frontend has a useful shell and modern dependencies, but module isolation, authorization-aware navigation, test coverage, accessibility verification, and production workflows are not yet mature.

