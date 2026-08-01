# JUTH Enterprise Hospital Operating System (JUTH HOS)

Enterprise Architecture & Development Constitution

Volume 05

Enterprise Patient Workspace

Document ID:  
JUTH-CONSTITUTION-V05

Version:  
1.0

Status:  
Approved Draft

Authority:  
Chief Software Architect

## 1. PURPOSE

This volume defines the Enterprise Patient Workspace, the primary clinical working environment used throughout the JUTH Hospital Operating System.

The Enterprise Patient Workspace is the constitutional foundation for every clinical specialty and shall provide a consistent, patient-centred experience across the platform.

No specialty module shall replace the Enterprise Patient Workspace. Specialties extend it through approved extension points.

## 2. DESIGN PHILOSOPHY

The workspace exists to support clinical decision-making by presenting the right information, in the right context, at the right time.

The workspace shall:

- Maintain patient context across workflows.
- Minimise unnecessary navigation.
- Reduce cognitive load.
- Support multidisciplinary care.
- Present clinically relevant information consistently.
- Scale across specialties without redesign.

## 3. ENTERPRISE WORKSPACE MODEL

The workspace is composed of shared platform elements.

These include:

- Enterprise Application Shell
- Global Header
- Patient Banner
- Clinical Ribbon
- Patient Context Bar
- Clinical Navigator
- Central Clinical Workspace
- AI Clinical Assistant
- Notification Framework
- Modal Framework
- Command Palette
- Status and Messaging Framework

All specialties inherit these platform elements.

## 4. THREE-COLUMN LAYOUT

Desktop layout shall use a three-column architecture.

Column 1:  
Clinical Navigator

Default width:  
280px

Collapsed width:  
72px

Column 2:  
Clinical Workspace

Flexible width

Primary work surface

Column 3:  
AI Clinical Assistant

Default width:  
360px

Minimum:  
240px

Maximum:  
480px

Collapsed width:  
64px

The layout shall use CSS Grid and avoid fixed percentage-based layouts.

## 5. PATIENT CONTEXT

Patient context is persistent throughout the workspace.

The active patient shall remain available across navigation unless intentionally changed.

Patient context includes, where applicable:

- Identity
- Encounter
- Location
- Allergies
- Alerts
- Care Team
- Clinical Status

## 6. ENTERPRISE PATIENT BANNER

The Patient Banner provides a concise clinical overview.

It shall display:

- Patient identifiers
- Demographics
- Visit information
- Allergies
- Clinical alerts
- Care team
- Current encounter

The banner shall remain visually consistent across specialties.

## 7. CLINICAL RIBBON

The Clinical Ribbon provides rapid access to high-value patient information.

Examples include:

- Vitals
- Active problems
- Medications
- Orders
- Investigations
- Outstanding tasks
- Risk indicators

## 8. CLINICAL NAVIGATOR

The navigator provides access to workspace sections and specialty extensions.

It supports:

- Expand/collapse
- Persistent state
- Keyboard navigation
- Responsive adaptation
- Module registration through approved extension points

## 9. AI CLINICAL ASSISTANT

The AI Assistant is a native workspace component.

It is not an external chatbot.

Capabilities may include:

- Patient summaries
- Documentation assistance
- Clinical reminders
- Drug interaction awareness
- Decision support
- Workflow guidance

The panel shall be:

- Collapsible
- Resizable
- Context-aware
- Non-blocking

Clinical decisions remain the responsibility of authorised healthcare professionals.

## 10. WORKSPACE STATE

Workspace state shall be managed centrally.

Examples include:

- Selected patient
- Selected encounter
- Selected section
- Navigator state
- AI panel state
- Workspace mode
- User preferences

State persistence shall improve workflow continuity without compromising security.

## 11. SPECIALTY EXTENSIBILITY

Specialty modules extend the Enterprise Patient Workspace through approved interfaces.

Modules may contribute:

- Navigation entries
- Workspace tabs
- Clinical widgets
- Context actions
- AI capabilities
- Workflow tools

Specialties shall not replace shared workspace infrastructure.

## 12. RESPONSIVE BEHAVIOUR

Desktop:  
Three-column workspace.

Tablet:  
Collapsed navigator.  
AI panel presented as an overlay.

Mobile:  
Drawer-based navigation.  
Drawer-based AI panel.  
Preserved patient context.

## 13. MOCK DATA STRATEGY

Frontend development shall use shared enterprise mock data models.

A single mock patient model shall supply all workspace components to simulate production behaviour and minimise future integration effort.

## 14. EVOLUTION

Changes to the Enterprise Patient Workspace require:

Architectural review.

ADR approval.

Constitution updates where applicable.

## 15. SUMMARY

The Enterprise Patient Workspace is the shared clinical operating environment for every specialty. It delivers a consistent, extensible, secure, and patient-centred experience across the JUTH HOS platform.
