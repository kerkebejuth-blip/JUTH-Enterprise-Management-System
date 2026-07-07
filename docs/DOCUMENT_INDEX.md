# Documentation Index

## Purpose

This document is the master navigation hub for the Hospital Operating System (HOS) documentation set. It provides a consolidated inventory of all major project documents, their purpose, ownership, status, version, and dependencies.

It is intended to help architects, developers, contributors, maintainers, and future AI assistants navigate the repository documentation efficiently and consistently.

## Scope

This index covers the documentation tree under the docs directory, including:

- project management
- system context and vision
- requirements and architecture
- database, API, frontend, and backend design
- security, deployment, testing, and compliance
- module specifications
- legacy system framework
- AI engineering and HOS development intelligence
- integrations, research, training, and release documentation

## Document Governance

### How New Documents Should Be Added

1. Place the file in the most appropriate directory under docs/.
2. Use a descriptive filename following the existing naming convention.
3. Include a revision history section with purpose, scope, audience, dependencies, and references.
4. Add the document to this index in the relevant section.
5. Cross-reference related documents where appropriate.
6. Keep the document aligned with the current architecture, roadmap, and release direction.

### Versioning Conventions

Use semantic-style versioning for documentation updates:

- MAJOR: structural changes, major scope changes, or significant re-architecture
- MINOR: new sections, expanded guidance, or meaningful additions
- PATCH: typo fixes, clarifications, minor wording improvements

Recommended format:

- 0.1.0 for initial draft documents
- 0.2.0 for expanded documentation
- 1.0.0 for stable baseline documentation

## Cross-References

This index should be used alongside the following foundational documents:

- [Project Charter](../README.md)
- [Roadmap](00_Project_Management/ROADMAP.md)
- [ADR-001](16_Decision_Records/ADR-001.md)
- [AI Development Playbook](23_AI_Engineering/00_AI_DEVELOPMENT_PLAYBOOK.md)
- [HOS Engineering Handbook](25_Project_Operations/HOS_ENGINEERING_HANDBOOK.md)

## Documentation Catalog

### 00_Project_Management

| Document | Purpose | Owner | Status | Version | Dependencies |
| --- | --- | --- | --- | --- | --- |
| [ROADMAP.md](00_Project_Management/ROADMAP.md) | Long-range plan for HOS and JDMS delivery. | Architecture Team | Draft | 0.1.0 | Project Context, System Vision, Requirements |
| [BACKLOG.md](00_Project_Management/BACKLOG.md) | Prioritized list of platform and implementation work. | Product & Engineering | Draft | 0.1.0 | Roadmap, Release Plan |
| [SPRINT_00.md](00_Project_Management/SPRINT_00.md) | Initial foundation sprint. | Engineering Lead | Draft | 0.1.0 | Backlog, Architecture |
| [SPRINT_01.md](00_Project_Management/SPRINT_01.md) | First feature-oriented delivery sprint. | Engineering Lead | Draft | 0.1.0 | Sprint 00, Release Plan |
| [RELEASE_PLAN.md](00_Project_Management/RELEASE_PLAN.md) | Release strategy and milestone planning. | Program Management | Draft | 0.1.0 | Roadmap, Release Notes |
| [NEXT_TASK.md](00_Project_Management/NEXT_TASK.md) | Current execution priorities. | Maintainers | Draft | 0.1.0 | Backlog, Sprint 01 |

### 01_Project_Context

| Document | Purpose | Owner | Status | Version | Dependencies |
| --- | --- | --- | --- | --- | --- |
| [PROJECT_CONTEXT.md](01_Project_Context/PROJECT_CONTEXT.md) | Business and operational context for HOS. | Architecture Team | Draft | 0.1.0 | System Vision, Requirements |

### 02_System_Vision

| Document | Purpose | Owner | Status | Version | Dependencies |
| --- | --- | --- | --- | --- | --- |
| [SYSTEM_VISION.md](02_System_Vision/SYSTEM_VISION.md) | Strategic future-state definition of the platform. | Leadership & Architecture | Draft | 0.1.0 | Project Context, Architecture |

### 03_Requirements

| Document | Purpose | Owner | Status | Version | Dependencies |
| --- | --- | --- | --- | --- | --- |
| [SOFTWARE_REQUIREMENTS_SPECIFICATION.md](03_Requirements/SOFTWARE_REQUIREMENTS_SPECIFICATION.md) | Functional and non-functional requirements baseline. | Product & Architecture | Draft | 0.1.0 | System Vision, Architecture |

### 04_Architecture

| Document | Purpose | Owner | Status | Version | Dependencies |
| --- | --- | --- | --- | --- | --- |
| [SYSTEM_ARCHITECTURE.md](04_Architecture/SYSTEM_ARCHITECTURE.md) | High-level platform architecture. | Solution Architecture | Draft | 0.1.0 | Technology Stack, Architecture Principles |
| [TECHNOLOGY_STACK.md](04_Architecture/TECHNOLOGY_STACK.md) | Approved implementation technologies. | Engineering Lead | Draft | 0.1.0 | Architecture |
| [ARCHITECTURE_PRINCIPLES.md](04_Architecture/ARCHITECTURE_PRINCIPLES.md) | Governing design principles. | Architecture Team | Draft | 0.1.0 | System Architecture |
| [HOSPITAL_BUSINESS_ARCHITECTURE.md](04_Architecture/HOSPITAL_BUSINESS_ARCHITECTURE.md) | Enterprise business architecture for a tertiary teaching hospital. | Healthcare Enterprise Architecture | Draft | 0.1.0 | System Vision, Requirements, System Architecture |
| [DOMAIN_DRIVEN_ARCHITECTURE.md](04_Architecture/DOMAIN_DRIVEN_ARCHITECTURE.md) | Domain-driven software architecture for HOS modules and services. | Solution Architecture | Draft | 0.1.0 | Hospital Business Architecture, System Architecture |

### 05_Database

| Document | Purpose | Owner | Status | Version | Dependencies |
| --- | --- | --- | --- | --- | --- |
| [DATABASE_DESIGN.md](05_Database/DATABASE_DESIGN.md) | Enterprise data architecture and storage strategy. | Data Engineering | Draft | 0.1.0 | Data Model, Backend Architecture |
| [DATA_MODEL.md](05_Database/DATA_MODEL.md) | Logical domain model direction. | Data Architecture | Draft | 0.1.0 | Database Design, API Specification |

### 06_API

| Document | Purpose | Owner | Status | Version | Dependencies |
| --- | --- | --- | --- | --- | --- |
| [API_SPECIFICATION.md](06_API/API_SPECIFICATION.md) | Platform API contract and service surface. | Backend Team | Draft | 0.1.0 | API Standards, Backend Architecture |
| [API_STANDARDS.md](06_API/API_STANDARDS.md) | API design and documentation standards. | Backend Team | Draft | 0.1.0 | API Specification, Security |

### 07_Frontend

| Document | Purpose | Owner | Status | Version | Dependencies |
| --- | --- | --- | --- | --- | --- |
| [FRONTEND_ARCHITECTURE.md](07_Frontend/FRONTEND_ARCHITECTURE.md) | Frontend architecture and experience approach. | Frontend Team | Draft | 0.1.0 | UI Design System, API Specification |

### 08_Backend

| Document | Purpose | Owner | Status | Version | Dependencies |
| --- | --- | --- | --- | --- | --- |
| [BACKEND_ARCHITECTURE.md](08_Backend/BACKEND_ARCHITECTURE.md) | Backend services and module boundaries. | Backend Team | Draft | 0.1.0 | API Standards, Database Design |

### 09_Security

| Document | Purpose | Owner | Status | Version | Dependencies |
| --- | --- | --- | --- | --- | --- |
| [SECURITY_ARCHITECTURE.md](09_Security/SECURITY_ARCHITECTURE.md) | Security architecture and controls. | Security Team | Draft | 0.1.0 | Authentication, Deployment |
| [AUTHENTICATION_AUTHORIZATION.md](09_Security/AUTHENTICATION_AUTHORIZATION.md) | Identity, roles, tokens, and access control. | Security Team | Draft | 0.1.0 | Security Architecture, API Standards |

### 10_Deployment

| Document | Purpose | Owner | Status | Version | Dependencies |
| --- | --- | --- | --- | --- | --- |
| [DEPLOYMENT_GUIDE.md](10_Deployment/DEPLOYMENT_GUIDE.md) | Deployment model, environments, and operations readiness. | DevOps Team | Draft | 0.1.0 | Security Architecture, Testing Strategy |

### 11_Testing

| Document | Purpose | Owner | Status | Version | Dependencies |
| --- | --- | --- | --- | --- | --- |
| [TESTING_STRATEGY.md](11_Testing/TESTING_STRATEGY.md) | Testing approach for quality and regression control. | QA & Engineering | Draft | 0.1.0 | Deployment Guide, Backend Architecture |

### 12_Module_Specifications

| Document | Purpose | Owner | Status | Version | Dependencies |
| --- | --- | --- | --- | --- | --- |
| [MODULE_INDEX.md](12_Module_Specifications/MODULE_INDEX.md) | Planned module catalog for the platform. | Architecture Team | Draft | 0.1.0 | Requirements, Architecture |

### 13_Legacy_System

| Document | Purpose | Owner | Status | Version | Dependencies |
| --- | --- | --- | --- | --- | --- |
| [README.md](13_Legacy_System/README.md) | Framework for documenting legacy integrations. | Integration Team | Draft | 0.1.0 | Integration Strategy |

### 14_AI

| Document | Purpose | Owner | Status | Version | Dependencies |
| --- | --- | --- | --- | --- | --- |
| [AI_ROADMAP.md](14_AI/AI_ROADMAP.md) | AI strategy and roadmap. | AI Engineering Lead | Draft | 0.1.0 | Integration Strategy, Architecture |

### 15_Statewide_Platform

| Document | Purpose | Owner | Status | Version | Dependencies |
| --- | --- | --- | --- | --- | --- |
| [STATEWIDE_HEALTH_PLATFORM.md](15_Statewide_Platform/STATEWIDE_HEALTH_PLATFORM.md) | Expansion strategy for statewide deployments. | Architecture Team | Draft | 0.1.0 | Project Context, Integration Strategy |

### 16_Decision_Records

| Document | Purpose | Owner | Status | Version | Dependencies |
| --- | --- | --- | --- | --- | --- |
| [ADR-001.md](16_Decision_Records/ADR-001.md) | Records the platform-first architectural decision. | Architecture Team | Draft | 0.1.0 | Architecture Principles, System Vision |

### 17_UI_Design_System

| Document | Purpose | Owner | Status | Version | Dependencies |
| --- | --- | --- | --- | --- | --- |
| [UI_DESIGN_SYSTEM.md](17_UI_Design_System/UI_DESIGN_SYSTEM.md) | Visual and interaction standards for the platform. | UX & Frontend | Draft | 0.1.0 | Frontend Architecture |

### 18_Research

| Document | Purpose | Owner | Status | Version | Dependencies |
| --- | --- | --- | --- | --- | --- |
| [RESEARCH_STRATEGY.md](18_Research/RESEARCH_STRATEGY.md) | Research direction and innovation planning. | Research Lead | Draft | 0.1.0 | AI Roadmap, Integration Strategy |

### 19_Training

| Document | Purpose | Owner | Status | Version | Dependencies |
| --- | --- | --- | --- | --- | --- |
| [TRAINING_PLAN.md](19_Training/TRAINING_PLAN.md) | Training approach for contributors and operational staff. | Operations & ICT | Draft | 0.1.0 | Project Context, Deployment Guide |

### 20_Integrations

| Document | Purpose | Owner | Status | Version | Dependencies |
| --- | --- | --- | --- | --- | --- |
| [INTEGRATION_STRATEGY.md](20_Integrations/INTEGRATION_STRATEGY.md) | Integration model for internal and external systems. | Integration Team | Draft | 0.1.0 | API Specification, Security Architecture |

### 21_Compliance

| Document | Purpose | Owner | Status | Version | Dependencies |
| --- | --- | --- | --- | --- | --- |
| [COMPLIANCE_FRAMEWORK.md](21_Compliance/COMPLIANCE_FRAMEWORK.md) | Governance and compliance baseline. | Compliance & Security | Draft | 0.1.0 | Security Architecture, Deployment Guide |

### 22_Release_Notes

| Document | Purpose | Owner | Status | Version | Dependencies |
| --- | --- | --- | --- | --- | --- |
| [RELEASE_NOTES.md](22_Release_Notes/RELEASE_NOTES.md) | Historical record of released milestones. | Maintainers | Draft | 0.1.0 | Release Plan, Roadmap |

### 23_AI_Engineering

| Document | Purpose | Owner | Status | Version | Dependencies |
| --- | --- | --- | --- | --- | --- |
| [00_AI_DEVELOPMENT_PLAYBOOK.md](23_AI_Engineering/00_AI_DEVELOPMENT_PLAYBOOK.md) | Governance for AI-assisted engineering. | AI Engineering Lead | Draft | 0.1.0 | AI Roadmap, Coding Standards |
| [01_SYSTEM_PROMPT.md](23_AI_Engineering/01_SYSTEM_PROMPT.md) | Canonical system prompt for AI-supported work. | AI Engineering Lead | Draft | 0.1.0 | AI Development Playbook |
| [02_DOCUMENTATION_PROMPTS.md](23_AI_Engineering/02_DOCUMENTATION_PROMPTS.md) | Reusable prompts for documentation tasks. | Technical Writing | Draft | 0.1.0 | AI Development Playbook |
| [03_ARCHITECTURE_PROMPTS.md](23_AI_Engineering/03_ARCHITECTURE_PROMPTS.md) | Reusable prompts for architecture analysis. | Architecture Team | Draft | 0.1.0 | AI Development Playbook |
| [04_DATABASE_PROMPTS.md](23_AI_Engineering/04_DATABASE_PROMPTS.md) | Reusable prompts for database work. | Data Engineering | Draft | 0.1.0 | AI Development Playbook |
| [05_BACKEND_PROMPTS.md](23_AI_Engineering/05_BACKEND_PROMPTS.md) | Reusable prompts for backend implementation. | Backend Team | Draft | 0.1.0 | AI Development Playbook |
| [06_FRONTEND_PROMPTS.md](23_AI_Engineering/06_FRONTEND_PROMPTS.md) | Reusable prompts for frontend implementation. | Frontend Team | Draft | 0.1.0 | AI Development Playbook |
| [07_API_PROMPTS.md](23_AI_Engineering/07_API_PROMPTS.md) | Reusable prompts for API design and implementation. | Backend Team | Draft | 0.1.0 | AI Development Playbook |
| [08_TESTING_PROMPTS.md](23_AI_Engineering/08_TESTING_PROMPTS.md) | Reusable prompts for testing and validation. | QA & Engineering | Draft | 0.1.0 | AI Development Playbook |
| [09_CODE_REVIEW_PROMPTS.md](23_AI_Engineering/09_CODE_REVIEW_PROMPTS.md) | Reusable prompts for code review. | Maintainers | Draft | 0.1.0 | AI Development Playbook |
| [10_SECURITY_PROMPTS.md](23_AI_Engineering/10_SECURITY_PROMPTS.md) | Reusable prompts for secure implementation. | Security Team | Draft | 0.1.0 | AI Development Playbook |
| [11_DEPLOYMENT_PROMPTS.md](23_AI_Engineering/11_DEPLOYMENT_PROMPTS.md) | Reusable prompts for deployment tasks. | DevOps Team | Draft | 0.1.0 | AI Development Playbook |
| [12_DEBUGGING_PROMPTS.md](23_AI_Engineering/12_DEBUGGING_PROMPTS.md) | Reusable prompts for debugging and investigation. | Engineering Team | Draft | 0.1.0 | AI Development Playbook |
| [13_REFACTORING_PROMPTS.md](23_AI_Engineering/13_REFACTORING_PROMPTS.md) | Reusable prompts for refactoring. | Engineering Team | Draft | 0.1.0 | AI Development Playbook |
| [14_MODULE_DEVELOPMENT_PROMPTS.md](23_AI_Engineering/14_MODULE_DEVELOPMENT_PROMPTS.md) | Reusable prompts for module development. | Architecture Team | Draft | 0.1.0 | AI Development Playbook |

### 24_HOS_Development_Intelligence

| Document | Purpose | Owner | Status | Version | Dependencies |
| --- | --- | --- | --- | --- | --- |
| [CODING_STANDARDS.md](24_HOS_Development_Intelligence/CODING_STANDARDS.md) | Engineering and implementation standards. | Engineering Team | Draft | 0.1.0 | Architecture Principles, Design Patterns |
| [DESIGN_PATTERNS.md](24_HOS_Development_Intelligence/DESIGN_PATTERNS.md) | Preferred implementation approaches. | Architecture Team | Draft | 0.1.0 | Coding Standards |
| [NAMING_CONVENTIONS.md](24_HOS_Development_Intelligence/NAMING_CONVENTIONS.md) | Standard naming conventions for code and docs. | Engineering Team | Draft | 0.1.0 | Coding Standards |
| [BUSINESS_RULES.md](24_HOS_Development_Intelligence/BUSINESS_RULES.md) | Shared business rules affecting implementation. | Product & Architecture | Draft | 0.1.0 | Requirements |
| [CLINICAL_RULES.md](24_HOS_Development_Intelligence/CLINICAL_RULES.md) | Clinical safety and governance considerations. | Clinical Informatics | Draft | 0.1.0 | Business Rules, Module Index |
| [ARCHITECTURE_KNOWLEDGE.md](24_HOS_Development_Intelligence/ARCHITECTURE_KNOWLEDGE.md) | Preservation of architectural context and assumptions. | Architecture Team | Draft | 0.1.0 | Architecture Principles |
| [LESSONS_LEARNED.md](24_HOS_Development_Intelligence/LESSONS_LEARNED.md) | Learned lessons and improvement guidance. | Maintainers | Draft | 0.1.0 | Architecture Knowledge |
| [COMMON_PITFALLS.md](24_HOS_Development_Intelligence/COMMON_PITFALLS.md) | Known risks and avoidable mistakes. | Engineering Team | Draft | 0.1.0 | Lessons Learned |
| [AI_CONTEXT.md](24_HOS_Development_Intelligence/AI_CONTEXT.md) | AI operating context for repository assistance. | AI Engineering Lead | Draft | 0.1.0 | AI Development Playbook, Coding Standards |

### 25_Project_Operations

| Document | Purpose | Owner | Status | Version | Dependencies |
| --- | --- | --- | --- | --- | --- |
| [HOS_ENGINEERING_HANDBOOK.md](25_Project_Operations/HOS_ENGINEERING_HANDBOOK.md) | Engineering constitution and delivery governance for HOS and JDMS. | Chief Software Architect | Draft | 0.1.0 | Project Charter, Roadmap, ADR-001, Documentation Index |

### 29_Capability_Model

| Document | Purpose | Owner | Status | Version | Dependencies |
| --- | --- | --- | --- | --- | --- |
| [README.md](29_Capability_Model/README.md) | Capability model foundation for future HOS module implementation. | Enterprise Capability Architecture | Draft | 0.1.0 | Hospital Business Architecture, Domain-Driven Architecture, System Architecture |

### 00_HOS_Blueprint

| Document | Purpose | Owner | Status | Version | Dependencies |
| --- | --- | --- | --- | --- | --- |
| [00_HOS_BLUEPRINT.md](00_HOS_BLUEPRINT.md) | Master entry-point blueprint for HOS strategy, architecture, capabilities, engineering, and evolution. | Chief Enterprise Architect | Draft | 0.1.0 | Project Charter, Roadmap, Business Architecture, System Architecture, Capability Model |

## Summary

This index is intended to be the primary document hub for HOS engineering, governance, and delivery documentation. It should be updated whenever a new document is created, renamed, retired, or materially revised.
