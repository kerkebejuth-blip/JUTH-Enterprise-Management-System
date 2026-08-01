# JUTH Enterprise Hospital Operating System (JUTH HOS)

Enterprise Architecture & Development Constitution

Volume 03

Frontend Architecture

Document ID:  
JUTH-CONSTITUTION-V03

Version:  
1.0

Status:  
Approved Draft

Authority:  
Chief Software Architect

## 1. PURPOSE

This volume defines the constitutional architecture governing every frontend application, shared component, design system, workflow, user interaction, and presentation layer within JUTH HOS.

The frontend shall be implemented as an enterprise platform rather than a collection of unrelated screens.

## 2. FRONTEND PHILOSOPHY

The frontend exists to support safe and efficient clinical work.

It shall prioritise:

- Clinical usability
- Consistency
- Accessibility
- Performance
- Discoverability
- Workflow continuity
- Patient context
- Reusability

Every specialty shall inherit a common enterprise experience.

## 3. TECHNOLOGY PLATFORM

Framework:  
React

Language:  
TypeScript

Workspace:  
Turborepo + PNPM

Design System:  
Shared enterprise component library

Styling:  
Shared design tokens and reusable UI components

## 4. APPLICATION MODEL

The Staff Portal is the Enterprise Clinical Workspace.

It is not merely an administrative dashboard.

All clinical specialties extend this workspace.

Examples include:

Eye Clinic

General Outpatient

Emergency

Ward

ICU

Operating Theatre

Radiology

Laboratory

Pharmacy

Dental

Physiotherapy

No specialty shall replace the shared workspace.

## 5. SHARED DESIGN SYSTEM

All reusable UI elements belong to the shared design system.

Examples include:

Buttons

Forms

Inputs

Tables

Dialogs

Navigation

Cards

Badges

Toolbars

Typography

Icons

Spacing

Colours

Themes

No module shall duplicate shared components.

## 6. LAYOUT ARCHITECTURE

The platform uses a shared layout engine.

Shared layouts include:

Application shell

Header

Navigation

Workspace layout

Responsive layout manager

Patient workspace

Modal system

Notification system

Every module shall inherit these layouts.

## 7. ROUTING

Routing shall be modular.

Modules register routes through defined extension points.

The core routing system remains stable.

## 8. STATE MANAGEMENT

Separate:

Application state

Workspace state

Patient context

Authentication state

UI state

Server state

Shared state shall be isolated from module-specific state.

## 9. COMPONENT ARCHITECTURE

Components shall follow:

Single responsibility

Composition over inheritance

Reusable interfaces

Strong typing

Accessibility requirements

Presentation components remain independent of business logic.

## 10. RESPONSIVE DESIGN

Desktop remains the primary clinical environment.

Tablet and mobile support shall preserve functionality while adapting navigation and workspace presentation appropriately.

## 11. PERFORMANCE

Frontend architecture shall support:

Lazy loading

Code splitting

Caching

Virtualisation where appropriate

Efficient rendering

Minimal unnecessary re-renders

## 12. ACCESSIBILITY

The platform shall support accessible navigation and interaction.

Accessibility requirements apply to all shared components.

## 13. TESTING

Frontend testing includes:

Unit tests

Component tests

Integration tests

Visual regression

Accessibility validation

## 14. EVOLUTION

Frontend architecture evolves through approved ADRs.

Modules may extend shared capabilities but shall not replace the enterprise platform.

## 15. SUMMARY

The frontend is a shared enterprise clinical platform. It delivers a consistent experience across all specialties while remaining modular, scalable, accessible, performant, and maintainable.
