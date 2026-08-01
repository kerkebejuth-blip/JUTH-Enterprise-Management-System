# Frontend Architecture

## Status

Version 1.0 Enterprise Architecture Baseline.

## Purpose

This document defines frontend architecture standards for JUTH HOS.

## Enterprise Workspace

The Staff Portal is the enterprise clinical workspace. It is not an administrative dashboard and shall not be replaced by specialty-specific applications.

Specialty modules extend the shared workspace through approved extension points.

## Layout Engine

The frontend uses shared layout concepts:

- Application shell.
- Header.
- Navigation.
- Enterprise Patient Workspace.
- Modal system.
- Notification system.
- AI assistant panel.

Desktop clinical work prioritizes the shared workspace model. Tablet and mobile layouts must preserve patient context and workflow continuity.

## Routing Philosophy

Routing shall be modular and stable. Core routing provides shell-level navigation. Future modules register routes through approved extension points.

Routing changes that affect workflow or module boundaries require architecture review.

## Component Architecture

Components shall follow:

- Composition over inheritance.
- Single responsibility.
- Strong TypeScript props.
- Accessibility requirements.
- Design-system reuse.
- Separation of presentation and business logic.

Shared components belong in the shared design system.

## State Management

State shall be separated into:

- Application state.
- Workspace state.
- Patient context.
- Authentication state.
- UI state.
- Server state.

Server state should use query/cache patterns. Shared state shall not become an ungoverned global data store.

## Accessibility

All shared components shall support accessible interaction, semantic structure, keyboard navigation, visible focus, and readable contrast.

Accessibility is a quality gate for clinical usability.

## Design System

The design system provides:

- Tokens.
- Typography.
- Spacing.
- Color.
- Buttons.
- Forms.
- Inputs.
- Dialogs.
- Tables.
- Navigation.
- Icons.

Modules shall not duplicate shared design-system components.

## Responsive Behaviour

Desktop remains the primary clinical environment. Tablet and mobile support shall adapt navigation and workspace presentation without losing patient context.

## Performance

Frontend architecture shall support:

- Lazy loading.
- Code splitting.
- Efficient rendering.
- Server-state caching.
- Virtualization where appropriate.
- Minimal unnecessary re-renders.

Performance regressions in critical workflows require investigation.

## Lazy Loading

Future feature modules should be lazy-loadable where module size or workflow separation justifies it. Lazy loading must not compromise security checks or patient context.

## AI Workspace Integration

The AI assistant is a native workspace capability. It shall be context-aware, collapsible, non-blocking, and governed by AI engineering standards.

AI assistance shall support authorized users and shall not replace clinical responsibility.

## Testing

Frontend testing shall include:

- Unit tests.
- Component tests.
- Accessibility tests.
- Integration tests.
- Visual regression where applicable.
- E2E workflow tests.

## Governance

Frontend architecture changes require review. Specialty modules require approved Domain Blueprints before implementation.

