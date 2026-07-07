from pathlib import Path

ROOT = Path(r"c:\Users\FAROUQ\Documents\GitHub\JUTH-Enterprise-Management-System")


def build_doc(title, purpose, scope, audience, dependencies, references, sections, version="1.0"):
    lines = [f"# {title}", "", f"**Status:** Active", "", "## Revision History", "", "| Version | Date | Author | Summary |", "| --- | --- | --- | --- |", f"| {version} | 2026-07-07 | Architecture Team | Initial enterprise documentation draft |", "", "## Purpose", "", purpose, "", "## Scope", "", scope, "", "## Audience", "", audience, "", "## Dependencies", "", dependencies, "", "## References", "", references, ""]
    lines.extend(sections)
    return "\n".join(lines) + "\n"

files = {}

files["README.md"] = """# Hospital Operating System (HOS)

A Modular, Enterprise-Grade Digital Operating System for Hospitals

[![Status: In Development](https://img.shields.io/badge/status-in%20development-orange)](https://github.com)
[![Platform: Enterprise](https://img.shields.io/badge/platform-enterprise-blue)](https://github.com)
[![Docs: Architecture](https://img.shields.io/badge/docs-architecture-green)](docs/)
[![License: To Be Finalized](https://img.shields.io/badge/license-to%20be%20finalized-lightgrey)](https://github.com)

## Project Overview

The Hospital Operating System (HOS) is a reusable enterprise platform for managing hospitals across clinical, administrative, executive, academic, and AI-enabled functions. It is designed as a long-term foundation for scalable health information systems rather than a one-off application.

The first implementation of HOS is the JUTH Digital Management System (JDMS) for Jos University Teaching Hospital, Nigeria. In this structure, HOS is the platform and JDMS is the first deployment and domain-specific realization of that platform.

## Vision

To create a resilient, secure, and configurable hospital operating platform that can serve single hospitals, multi-hospital networks, and statewide health ecosystems.

## Architecture Summary

```mermaid
flowchart LR
    A[Users] --> B[Portal Applications]
    B --> C[API Gateway]
    C --> D[Core Platform Services]
    D --> E[Clinical Modules]
    D --> F[Administrative Modules]
    D --> G[Executive Analytics]
    D --> H[AI Services]
    D --> I[Data and Integration Layer]
```

## Documentation Index

- [Project Management](docs/00_Project_Management/ROADMAP.md)
- [Project Context](docs/01_Project_Context/PROJECT_CONTEXT.md)
- [System Vision](docs/02_System_Vision/SYSTEM_VISION.md)
- [Requirements](docs/03_Requirements/SOFTWARE_REQUIREMENTS_SPECIFICATION.md)
- [Architecture](docs/04_Architecture/SYSTEM_ARCHITECTURE.md)
- [Database](docs/05_Database/DATABASE_DESIGN.md)
- [API](docs/06_API/API_SPECIFICATION.md)
- [Frontend](docs/07_Frontend/FRONTEND_ARCHITECTURE.md)
- [Backend](docs/08_Backend/BACKEND_ARCHITECTURE.md)
- [Security](docs/09_Security/SECURITY_ARCHITECTURE.md)
- [Deployment](docs/10_Deployment/DEPLOYMENT_GUIDE.md)
- [Testing](docs/11_Testing/TESTING_STRATEGY.md)
- [AI Engineering](docs/23_AI_Engineering/00_AI_DEVELOPMENT_PLAYBOOK.md)

## Repository Scope

This repository is the foundation of a long-term, enterprise-grade Hospital Operating System intended to scale from JUTH to multiple hospitals and statewide deployments.
"""

files["docs/00_Project_Management/ROADMAP.md"] = build_doc(
    "Project Roadmap",
    "Provide the long-range implementation plan for HOS and JDMS.",
    "This roadmap covers the platform foundation, early module delivery, AI integration, and future statewide expansion.",
    "Project sponsors, architects, engineering leads, and contributors.",
    "Repository structure, system vision, requirements, architecture, and delivery cadence.",
    "- [Project Context](../01_Project_Context/PROJECT_CONTEXT.md)\n- [System Vision](../02_System_Vision/SYSTEM_VISION.md)\n- [Software Requirements Specification](../03_Requirements/SOFTWARE_REQUIREMENTS_SPECIFICATION.md)",
    ["## Roadmap Themes", "", "- Foundation and governance", "- Core hospital operations", "- Intelligence and analytics", "- Multi-site expansion", "", "## Milestones", "", "1. Foundation and documentation baseline", "2. Core administrative and clinical services", "3. Executive dashboards and AI integration", "4. Regional and statewide deployment readiness"]
)

files["docs/00_Project_Management/BACKLOG.md"] = build_doc(
    "Product Backlog",
    "Maintain a prioritized list of planned work for HOS.",
    "The backlog is intended for planning and execution tracking across platform and implementation work.",
    "Product owners, architects, and delivery leads.",
    "Roadmap, requirements, architecture, and release plan.",
    "- [Roadmap](ROADMAP.md)\n- [Release Plan](RELEASE_PLAN.md)",
    ["## Backlog Categories", "", "- Platform infrastructure", "- Clinical workflows", "- Administrative workflows", "- Security and compliance", "- AI and analytics", "", "## Priority Model", "", "High-priority items address foundational capability, compliance, or patient safety."]
)

files["docs/00_Project_Management/SPRINT_00.md"] = build_doc(
    "Sprint 00",
    "Document the initial setup sprint for the project foundation.",
    "Sprint 00 establishes the repository baseline, documentation, and architecture scaffolding.",
    "Delivery team and contributors.",
    "Backlog, architecture, and repository conventions.",
    "- [Backlog](BACKLOG.md)\n- [Next Task](NEXT_TASK.md)",
    ["## Sprint Goals", "", "- Create repository structure", "- Publish architecture and operations documentation", "- Establish engineering conventions"]
)

files["docs/00_Project_Management/SPRINT_01.md"] = build_doc(
    "Sprint 01",
    "Define the first feature sprint after the foundation sprint.",
    "Sprint 01 focuses on initial service boundaries and core workflow modules.",
    "Engineering team.",
    "Sprint 00 backlog and architecture decisions.",
    "- [Sprint 00](SPRINT_00.md)\n- [Release Plan](RELEASE_PLAN.md)",
    ["## Sprint Goals", "", "- Implement initial domain services", "- Prepare test and deployment scaffolding", "- Validate core APIs and data contracts"]
)

files["docs/00_Project_Management/RELEASE_PLAN.md"] = build_doc(
    "Release Plan",
    "Describe the planned release strategy for the platform.",
    "The release plan defines milestones for foundational, pilot, and expansion releases.",
    "Program managers and engineering leads.",
    "Roadmap, backlog, and architecture.",
    "- [Roadmap](ROADMAP.md)\n- [Release Notes](../22_Release_Notes/RELEASE_NOTES.md)",
    ["## Release Strategy", "", "- Alpha: internal architecture validation", "- Beta: pilot deployment with controlled users", "- GA: production-ready enterprise deployment"]
)

files["docs/00_Project_Management/NEXT_TASK.md"] = build_doc(
    "Next Task",
    "Capture the immediate action items for execution.",
    "This file should be updated continuously to reflect current priorities.",
    "Maintainers and contributors.",
    "Current backlog and roadmap.",
    "- [Backlog](BACKLOG.md)\n- [Sprint 01](SPRINT_01.md)",
    ["## Immediate Priorities", "", "1. Finalize repository governance", "2. Confirm domain service boundaries", "3. Define initial database schema and migrations", "4. Prepare CI/CD baseline"]
)

files["docs/01_Project_Context/PROJECT_CONTEXT.md"] = build_doc(
    "Project Context",
    "Provide the organizational and business context for HOS.",
    "The document explains why HOS exists, the target institutions, and the strategic value of the platform.",
    "Architects, delivery managers, and hospital stakeholders.",
    "System vision and requirements.",
    "- [System Vision](../02_System_Vision/SYSTEM_VISION.md)\n- [Software Requirements Specification](../03_Requirements/SOFTWARE_REQUIREMENTS_SPECIFICATION.md)",
    ["## Business Context", "", "HOS is intended to improve hospital operations, patient experience, decision-making, and long-term digital resilience."]
)

files["docs/02_System_Vision/SYSTEM_VISION.md"] = build_doc(
    "System Vision",
    "Describe the desired future state of the platform.",
    "The vision document defines the strategic direction for HOS and JDMS.",
    "Leadership, architects, and contributors.",
    "Project context and requirements.",
    "- [Project Context](../01_Project_Context/PROJECT_CONTEXT.md)\n- [System Architecture](../04_Architecture/SYSTEM_ARCHITECTURE.md)",
    ["## Vision Statements", "", "- Support hospitals of different sizes and maturity", "- Provide a configurable platform rather than bespoke solutions", "- Enable secure, interoperable, and intelligent operations"]
)

files["docs/03_Requirements/SOFTWARE_REQUIREMENTS_SPECIFICATION.md"] = build_doc(
    "Software Requirements Specification",
    "Capture the functional and non-functional requirements for HOS.",
    "The SRS covers core requirements for healthcare operations, platform quality, security, and extensibility.",
    "Business analysts, architects, developers, and testers.",
    "Project context, vision, and architecture.",
    "- [System Vision](../02_System_Vision/SYSTEM_VISION.md)\n- [System Architecture](../04_Architecture/SYSTEM_ARCHITECTURE.md)",
    ["## Requirement Themes", "", "- Clinical workflows", "- Administrative operations", "- Executive analytics", "- Security and auditability", "- Integration and interoperability", "- Scalability and maintainability"]
)

files["docs/04_Architecture/SYSTEM_ARCHITECTURE.md"] = build_doc(
    "System Architecture",
    "Describe the high-level structure of the HOS platform.",
    "This document defines major components, layers, and architectural responsibilities.",
    "Solution architects and engineering leads.",
    "Requirements and technology stack.",
    "- [Technology Stack](TECHNOLOGY_STACK.md)\n- [Architecture Principles](ARCHITECTURE_PRINCIPLES.md)",
    ["## Architectural Layers", "", "1. Presentation layer", "2. Application services layer", "3. Domain and workflow layer", "4. Data and integration layer", "5. Infrastructure and operations layer", "", "## Architectural Goals", "", "- Modularity", "- Resilience", "- Interoperability", "- Security"]
)

files["docs/04_Architecture/TECHNOLOGY_STACK.md"] = build_doc(
    "Technology Stack",
    "Document the approved and planned technologies for implementation.",
    "The stack aligns with the development standards and deployment approach for HOS.",
    "Developers and architects.",
    "Architecture principles and delivery roadmap.",
    "- [System Architecture](SYSTEM_ARCHITECTURE.md)\n- [Architecture Principles](ARCHITECTURE_PRINCIPLES.md)",
    ["## Stack Baseline", "", "- React, TypeScript, Vite", "- NestJS, TypeScript", "- PostgreSQL, Prisma", "- Redis", "- Docker, NGINX, GitHub Actions"]
)

files["docs/04_Architecture/ARCHITECTURE_PRINCIPLES.md"] = build_doc(
    "Architecture Principles",
    "Define the governing principles for HOS architecture.",
    "These principles guide design choices and implementation standards.",
    "Architects, team leads, and reviewers.",
    "System architecture and coding standards.",
    "- [System Architecture](SYSTEM_ARCHITECTURE.md)\n- [Coding Standards](../24_HOS_Development_Intelligence/CODING_STANDARDS.md)",
    ["## Core Principles", "", "- Platform first", "- Configuration over customization", "- Modular boundaries", "- Secure by design", "- Observable and testable systems"]
)

files["docs/05_Database/DATABASE_DESIGN.md"] = build_doc(
    "Database Design",
    "Describe the enterprise database approach for HOS.",
    "The database design supports modular domains, transactional integrity, and future multi-tenant expansion.",
    "Database engineers and architects.",
    "Requirements and system architecture.",
    "- [Data Model](DATA_MODEL.md)\n- [Backend Architecture](../08_Backend/BACKEND_ARCHITECTURE.md)",
    ["## Data Strategy", "", "- PostgreSQL as the core transactional store", "- Prisma as schema and migration tooling", "- Clear domain ownership and isolation"]
)

files["docs/05_Database/DATA_MODEL.md"] = build_doc(
    "Data Model",
    "Document the logical data model direction for the platform.",
    "The data model covers patient, clinical, administrative, and operational domains.",
    "Developers and data architects.",
    "Database design and requirements.",
    "- [Database Design](DATABASE_DESIGN.md)\n- [API Specification](../06_API/API_SPECIFICATION.md)",
    ["## Core Entities", "", "- Patient", "- Encounter", "- Order", "- Staff", "- Financial transaction", "- Audit log"]
)

files["docs/06_API/API_SPECIFICATION.md"] = build_doc(
    "API Specification",
    "Define the platform API strategy and service surfaces.",
    "The API specification establishes the contract model for internal and external integrations.",
    "Backend and frontend developers.",
    "Backend architecture and data model.",
    "- [API Standards](API_STANDARDS.md)\n- [Backend Architecture](../08_Backend/BACKEND_ARCHITECTURE.md)",
    ["## API Structure", "", "- Authentication and identity endpoints", "- Clinical workflow endpoints", "- Administrative endpoints", "- Reporting and analytics endpoints"]
)

files["docs/06_API/API_STANDARDS.md"] = build_doc(
    "API Standards",
    "Define standards for API design and consistency.",
    "These standards ensure interoperability, maintainability, and predictable behaviors.",
    "Developers and reviewers.",
    "API specification.",
    "- [API Specification](API_SPECIFICATION.md)\n- [Security Architecture](../09_Security/SECURITY_ARCHITECTURE.md)",
    ["## Standards", "", "- RESTful resource naming", "- Versioned endpoints", "- Consistent error handling", "- Pagination and filtering", "- OpenAPI documentation"]
)

files["docs/07_Frontend/FRONTEND_ARCHITECTURE.md"] = build_doc(
    "Frontend Architecture",
    "Describe the web frontend architecture for HOS.",
    "The frontend architecture supports multi-portal experiences and reusable UI systems.",
    "Frontend developers and designers.",
    "Technology stack and UI design system.",
    "- [UI Design System](../17_UI_Design_System/UI_DESIGN_SYSTEM.md)\n- [API Specification](../06_API/API_SPECIFICATION.md)",
    ["## Frontend Goals", "", "- Reusable component model", "- Strong typing with TypeScript", "- Accessible and responsive interfaces"]
)

files["docs/08_Backend/BACKEND_ARCHITECTURE.md"] = build_doc(
    "Backend Architecture",
    "Describe the backend architecture for HOS services.",
    "The backend architecture focuses on modular services, domain logic, and integration boundaries.",
    "Backend developers and architects.",
    "Technology stack and API standards.",
    "- [API Standards](../06_API/API_STANDARDS.md)\n- [Database Design](../05_Database/DATABASE_DESIGN.md)",
    ["## Backend Principles", "", "- Modular services", "- Event-driven integration where appropriate", "- Clear domain ownership", "- Secure service boundaries"]
)

files["docs/09_Security/SECURITY_ARCHITECTURE.md"] = build_doc(
    "Security Architecture",
    "Define the security strategy for HOS.",
    "The architecture addresses authentication, authorization, encryption, monitoring, and compliance.",
    "Security engineers, architects, and operators.",
    "Backend architecture and deployment guide.",
    "- [Authentication and Authorization](AUTHENTICATION_AUTHORIZATION.md)\n- [Deployment Guide](../10_Deployment/DEPLOYMENT_GUIDE.md)",
    ["## Security Domains", "", "- Identity and access management", "- Data protection", "- Audit logging", "- Infrastructure security", "- Vulnerability management"]
)

files["docs/09_Security/AUTHENTICATION_AUTHORIZATION.md"] = build_doc(
    "Authentication and Authorization",
    "Define identity, access, and token handling for the platform.",
    "The document guides secure access design for staff, patients, and integrations.",
    "Security engineers and developers.",
    "Security architecture.",
    "- [Security Architecture](SECURITY_ARCHITECTURE.md)\n- [API Standards](../06_API/API_STANDARDS.md)",
    ["## Controls", "", "- JWT access tokens", "- Refresh tokens", "- Role-based and policy-based authorization", "- Session management and revocation"]
)

files["docs/10_Deployment/DEPLOYMENT_GUIDE.md"] = build_doc(
    "Deployment Guide",
    "Outline deployment practices for HOS services.",
    "The guide covers containerization, environment configuration, and operational readiness.",
    "DevOps engineers and operators.",
    "Architecture, security, and testing strategy.",
    "- [Security Architecture](../09_Security/SECURITY_ARCHITECTURE.md)\n- [Testing Strategy](../11_Testing/TESTING_STRATEGY.md)",
    ["## Deployment Model", "", "- Container-based deployment", "- NGINX as ingress and reverse proxy", "- CI/CD automation through GitHub Actions"]
)

files["docs/11_Testing/TESTING_STRATEGY.md"] = build_doc(
    "Testing Strategy",
    "Define the testing strategy for the platform.",
    "Testing must support reliability, safety, security, and regression prevention.",
    "Developers, QA engineers, and release managers.",
    "Architecture and deployment guide.",
    "- [Deployment Guide](../10_Deployment/DEPLOYMENT_GUIDE.md)\n- [Backend Architecture](../08_Backend/BACKEND_ARCHITECTURE.md)",
    ["## Test Layers", "", "- Unit tests", "- Integration tests", "- End-to-end tests", "- Security and performance tests"]
)

files["docs/12_Module_Specifications/MODULE_INDEX.md"] = build_doc(
    "Module Index",
    "Catalog the planned modules for the platform.",
    "The module index establishes the work partitioning for HOS capabilities.",
    "Architects and delivery teams.",
    "Requirements and architecture.",
    "- [System Architecture](../04_Architecture/SYSTEM_ARCHITECTURE.md)\n- [Software Requirements Specification](../03_Requirements/SOFTWARE_REQUIREMENTS_SPECIFICATION.md)",
    ["## Modules", "", "- Clinical", "- Administrative", "- Executive", "- Academic and research", "- AI and intelligence"]
)

files["docs/13_Legacy_System/README.md"] = build_doc(
    "Legacy System Framework",
    "Create a framework for documenting legacy hospital systems integration.",
    "This folder will hold the initial structure for legacy system analysis without documenting workflows yet.",
    "Architects and integration engineers.",
    "Integration strategy and architecture.",
    "- [Integration Strategy](../20_Integrations/INTEGRATION_STRATEGY.md)",
    ["## Planned Content", "", "- Legacy system inventory", "- Interface mapping", "- Migration constraints", "- Data ownership and transition approach"]
)

files["docs/14_AI/AI_ROADMAP.md"] = build_doc(
    "AI Roadmap",
    "Outline the AI strategy for HOS.",
    "The AI roadmap guides clinical decision support, analytics, and intelligent automation.",
    "AI engineers and architects.",
    "Architecture, requirements, and integration strategy.",
    "- [Integration Strategy](../20_Integrations/INTEGRATION_STRATEGY.md)\n- [System Architecture](../04_Architecture/SYSTEM_ARCHITECTURE.md)",
    ["## AI Domains", "", "- Clinical assistance", "- Predictive analytics", "- Workflow automation", "- Document intelligence"]
)

files["docs/15_Statewide_Platform/STATEWIDE_HEALTH_PLATFORM.md"] = build_doc(
    "Statewide Health Platform",
    "Define the long-term statewide deployment model.",
    "The statewide platform strategy focuses on federation, policy, interoperability, and scale.",
    "Program architects and government stakeholders.",
    "Project context, architecture, and integration strategy.",
    "- [Project Context](../01_Project_Context/PROJECT_CONTEXT.md)\n- [Integration Strategy](../20_Integrations/INTEGRATION_STRATEGY.md)",
    ["## Expansion Model", "", "- Multi-hospital deployment", "- Shared services and governance", "- Regional interoperability and reporting"]
)

files["docs/16_Decision_Records/ADR-001.md"] = build_doc(
    "ADR-001: Platform-First Architecture",
    "Record the initial architecture decision for HOS.",
    "This ADR establishes the platform-first approach rather than a single-hospital solution.",
    "Architects and technical leaders.",
    "Architecture principles and system vision.",
    "- [Architecture Principles](../04_Architecture/ARCHITECTURE_PRINCIPLES.md)\n- [System Vision](../02_System_Vision/SYSTEM_VISION.md)",
    ["## Decision", "", "Adopt a platform-first architecture that separates core services from implementation-specific modules."]
)

files["docs/17_UI_Design_System/UI_DESIGN_SYSTEM.md"] = build_doc(
    "UI Design System",
    "Define the visual and interaction standards for HOS interfaces.",
    "The design system supports consistent, accessible, enterprise-grade experiences.",
    "Designers, frontend engineers, and product teams.",
    "Frontend architecture.",
    "- [Frontend Architecture](../07_Frontend/FRONTEND_ARCHITECTURE.md)",
    ["## Principles", "", "- Accessibility", "- Consistency", "- Clarity", "- Scalable component design"]
)

files["docs/18_Research/RESEARCH_STRATEGY.md"] = build_doc(
    "Research Strategy",
    "Guide research and innovation work for the platform.",
    "Research activities focus on interoperability, workflow design, and AI-assisted healthcare operations.",
    "Research leads and architects.",
    "AI roadmap and architecture.",
    "- [AI Roadmap](../14_AI/AI_ROADMAP.md)\n- [Integration Strategy](../20_Integrations/INTEGRATION_STRATEGY.md)",
    ["## Research Areas", "", "- Clinical workflow optimization", "- Predictive care analytics", "- Human-centered interfaces", "- Secure data exchange"]
)

files["docs/19_Training/TRAINING_PLAN.md"] = build_doc(
    "Training Plan",
    "Outline the training approach for users and contributors.",
    "Training is essential for adoption, governance, and sustainable platform operation.",
    "Operations, ICT staff, and contributors.",
    "Project context and deployment guide.",
    "- [Project Context](../01_Project_Context/PROJECT_CONTEXT.md)\n- [Deployment Guide](../10_Deployment/DEPLOYMENT_GUIDE.md)",
    ["## Training Tracks", "", "- Developer onboarding", "- Administrator and support training", "- Clinical process orientation", "- Security and compliance awareness"]
)

files["docs/20_Integrations/INTEGRATION_STRATEGY.md"] = build_doc(
    "Integration Strategy",
    "Define the integration architecture for HOS.",
    "The strategy addresses internal services, external systems, and interoperability requirements.",
    "Integration engineers and architects.",
    "API standards and architecture.",
    "- [API Specification](../06_API/API_SPECIFICATION.md)\n- [Security Architecture](../09_Security/SECURITY_ARCHITECTURE.md)",
    ["## Integration Goals", "", "- Standard API-based connectivity", "- Secure data exchange", "- Support for legacy and modern systems"]
)

files["docs/21_Compliance/COMPLIANCE_FRAMEWORK.md"] = build_doc(
    "Compliance Framework",
    "Outline the compliance model for the platform.",
    "The framework aligns with enterprise governance, privacy, and healthcare operational expectations.",
    "Compliance officers, architects, and operators.",
    "Security architecture and deployment guide.",
    "- [Security Architecture](../09_Security/SECURITY_ARCHITECTURE.md)\n- [Deployment Guide](../10_Deployment/DEPLOYMENT_GUIDE.md)",
    ["## Compliance Areas", "", "- Access control", "- Audit trail management", "- Data retention", "- Incident response"]
)

files["docs/22_Release_Notes/RELEASE_NOTES.md"] = build_doc(
    "Release Notes",
    "Record release milestones and notable changes.",
    "Release notes provide a historical record for platform evolution.",
    "Maintainers and stakeholders.",
    "Release plan and roadmap.",
    "- [Release Plan](../00_Project_Management/RELEASE_PLAN.md)\n- [Roadmap](../00_Project_Management/ROADMAP.md)",
    ["## Initial Release Notes", "", "- Documentation foundation published", "- Architecture and governance baseline defined", "- Platform-first roadmap adopted"]
)

files["docs/23_AI_Engineering/00_AI_DEVELOPMENT_PLAYBOOK.md"] = build_doc(
    "AI Development Playbook",
    "Define how AI engineering work should be conducted in the repository.",
    "The playbook standardizes AI-assisted development practices and governance.",
    "AI engineers and contributors.",
    "AI roadmap and engineering standards.",
    "- [AI Roadmap](../14_AI/AI_ROADMAP.md)\n- [Coding Standards](../24_HOS_Development_Intelligence/CODING_STANDARDS.md)",
    ["## Playbook Principles", "", "- Human oversight", "- Explainable outputs", "- Security and privacy", "- Traceable prompts and decisions"]
)

files["docs/23_AI_Engineering/01_SYSTEM_PROMPT.md"] = build_doc(
    "System Prompt",
    "Provide the canonical system prompt for AI-assisted engineering tasks.",
    "The system prompt ensures consistent, enterprise-aligned assistance.",
    "AI assistants and contributors.",
    "AI development playbook.",
    "- [AI Development Playbook](00_AI_DEVELOPMENT_PLAYBOOK.md)",
    ["## Prompt Intent", "", "Act as a disciplined enterprise architect and software engineer supporting HOS development."]
)

files["docs/23_AI_Engineering/02_DOCUMENTATION_PROMPTS.md"] = build_doc(
    "Documentation Prompts",
    "Provide reusable prompts for documentation tasks.",
    "These prompts support documentation generation and maintenance.",
    "Technical writers and contributors.",
    "AI development playbook.",
    "- [AI Development Playbook](00_AI_DEVELOPMENT_PLAYBOOK.md)",
    ["## Prompt Categories", "", "- Architecture documentation", "- API documentation", "- Release notes", "- Compliance and training documentation"]
)

files["docs/23_AI_Engineering/03_ARCHITECTURE_PROMPTS.md"] = build_doc(
    "Architecture Prompts",
    "Provide prompts for architecture analysis and design.",
    "These prompts help maintain architectural clarity and consistency.",
    "Architects and contributors.",
    "AI development playbook.",
    "- [AI Development Playbook](00_AI_DEVELOPMENT_PLAYBOOK.md)",
    ["## Use Cases", "", "- Evaluate design trade-offs", "- Review architectural consistency", "- Propose modular boundaries"]
)

files["docs/23_AI_Engineering/04_DATABASE_PROMPTS.md"] = build_doc(
    "Database Prompts",
    "Provide prompts for database design and migration work.",
    "These prompts support schema planning and Prisma-related work.",
    "Database engineers and developers.",
    "AI development playbook.",
    "- [AI Development Playbook](00_AI_DEVELOPMENT_PLAYBOOK.md)",
    ["## Use Cases", "", "- Schema design", "- Migration planning", "- Query optimization"]
)

files["docs/23_AI_Engineering/05_BACKEND_PROMPTS.md"] = build_doc(
    "Backend Prompts",
    "Provide prompts for backend service development.",
    "These prompts support NestJS and API service work.",
    "Backend developers.",
    "AI development playbook.",
    "- [AI Development Playbook](00_AI_DEVELOPMENT_PLAYBOOK.md)",
    ["## Use Cases", "", "- Module scaffolding", "- Service design", "- Error handling", "- Integration patterns"]
)

files["docs/23_AI_Engineering/06_FRONTEND_PROMPTS.md"] = build_doc(
    "Frontend Prompts",
    "Provide prompts for frontend implementation.",
    "These prompts support the React and TypeScript UI layer.",
    "Frontend developers.",
    "AI development playbook.",
    "- [AI Development Playbook](00_AI_DEVELOPMENT_PLAYBOOK.md)",
    ["## Use Cases", "", "- Component creation", "- State management", "- Accessibility and testing"]
)

files["docs/23_AI_Engineering/07_API_PROMPTS.md"] = build_doc(
    "API Prompts",
    "Provide reusable prompts for API design and implementation.",
    "These prompts help maintain API standards and contract quality.",
    "Backend and integration developers.",
    "AI development playbook.",
    "- [AI Development Playbook](00_AI_DEVELOPMENT_PLAYBOOK.md)",
    ["## Use Cases", "", "- Endpoint design", "- Contract review", "- Integration examples"]
)

files["docs/23_AI_Engineering/08_TESTING_PROMPTS.md"] = build_doc(
    "Testing Prompts",
    "Provide prompts for test generation and validation.",
    "These prompts support unit, integration, and end-to-end testing.",
    "QA engineers and developers.",
    "AI development playbook.",
    "- [AI Development Playbook](00_AI_DEVELOPMENT_PLAYBOOK.md)",
    ["## Use Cases", "", "- Unit test creation", "- Regression case design", "- Test data planning"]
)

files["docs/23_AI_Engineering/09_CODE_REVIEW_PROMPTS.md"] = build_doc(
    "Code Review Prompts",
    "Provide prompts for reviewing code changes.",
    "These prompts help enforce design, security, and maintainability standards.",
    "Reviewers and maintainers.",
    "AI development playbook.",
    "- [AI Development Playbook](00_AI_DEVELOPMENT_PLAYBOOK.md)",
    ["## Review Areas", "", "- Correctness", "- Security", "- Performance", "- Maintainability"]
)

files["docs/23_AI_Engineering/10_SECURITY_PROMPTS.md"] = build_doc(
    "Security Prompts",
    "Provide prompts for secure implementation and review.",
    "These prompts support threat modeling and secure coding practices.",
    "Security engineers and developers.",
    "AI development playbook.",
    "- [AI Development Playbook](00_AI_DEVELOPMENT_PLAYBOOK.md)",
    ["## Prompt Focus", "", "- Authentication and authorization", "- Secret handling", "- Input validation", "- Auditability"]
)

files["docs/23_AI_Engineering/11_DEPLOYMENT_PROMPTS.md"] = build_doc(
    "Deployment Prompts",
    "Provide prompts for deployment and release support.",
    "These prompts support environment configuration and release readiness.",
    "DevOps engineers.",
    "AI development playbook.",
    "- [AI Development Playbook](00_AI_DEVELOPMENT_PLAYBOOK.md)",
    ["## Prompt Focus", "", "- Containerization", "- CI/CD", "- Environment checks", "- Release coordination"]
)

files["docs/23_AI_Engineering/12_DEBUGGING_PROMPTS.md"] = build_doc(
    "Debugging Prompts",
    "Provide prompts for issue investigation and remediation.",
    "These prompts help maintain traceability and speed during defect resolution.",
    "Developers and support engineers.",
    "AI development playbook.",
    "- [AI Development Playbook](00_AI_DEVELOPMENT_PLAYBOOK.md)",
    ["## Prompt Focus", "", "- Root cause investigation", "- Log analysis", "- Reproduction steps", "- Fix validation"]
)

files["docs/23_AI_Engineering/13_REFACTORING_PROMPTS.md"] = build_doc(
    "Refactoring Prompts",
    "Provide prompts for safe code refactoring.",
    "These prompts support maintainability and incremental modernization.",
    "Developers and maintainers.",
    "AI development playbook.",
    "- [AI Development Playbook](00_AI_DEVELOPMENT_PLAYBOOK.md)",
    ["## Prompt Focus", "", "- Structure improvement", "- Dependency reduction", "- Contract preservation"]
)

files["docs/23_AI_Engineering/14_MODULE_DEVELOPMENT_PROMPTS.md"] = build_doc(
    "Module Development Prompts",
    "Provide prompts for planning and implementing new modules.",
    "These prompts align module creation with platform architecture and business needs.",
    "Architects and module developers.",
    "AI development playbook.",
    "- [AI Development Playbook](00_AI_DEVELOPMENT_PLAYBOOK.md)",
    ["## Prompt Focus", "", "- Capability mapping", "- Service boundaries", "- Test plan creation"]
)

files["docs/24_HOS_Development_Intelligence/CODING_STANDARDS.md"] = build_doc(
    "Coding Standards",
    "Define engineering standards for implementation work.",
    "The coding standards preserve consistency, readability, and maintainability.",
    "All contributors.",
    "Architecture principles and development workflow.",
    "- [Architecture Principles](../04_Architecture/ARCHITECTURE_PRINCIPLES.md)\n- [Design Patterns](DESIGN_PATTERNS.md)",
    ["## Standards", "", "- Prefer clarity over cleverness", "- Keep modules small and focused", "- Document non-obvious decisions", "- Use strong typing and tests"]
)

files["docs/24_HOS_Development_Intelligence/DESIGN_PATTERNS.md"] = build_doc(
    "Design Patterns",
    "Record preferred implementation patterns for the platform.",
    "The patterns guide long-term maintainability and reusability.",
    "Developers and architects.",
    "Coding standards.",
    "- [Coding Standards](CODING_STANDARDS.md)\n- [Architecture Knowledge](ARCHITECTURE_KNOWLEDGE.md)",
    ["## Preferred Patterns", "", "- Repository and service patterns", "- Module boundary separation", "- Async and event-driven integration"]
)

files["docs/24_HOS_Development_Intelligence/NAMING_CONVENTIONS.md"] = build_doc(
    "Naming Conventions",
    "Standardize naming across code and documentation.",
    "Consistent naming reduces ambiguity and improves maintainability.",
    "All contributors.",
    "Coding standards.",
    "- [Coding Standards](CODING_STANDARDS.md)",
    ["## Conventions", "", "- Use descriptive names", "- Keep domain terms consistent", "- Prefer singular nouns for domain entities"]
)

files["docs/24_HOS_Development_Intelligence/BUSINESS_RULES.md"] = build_doc(
    "Business Rules",
    "Capture platform-level business rules.",
    "The document records cross-cutting rules that influence implementation.",
    "Business analysts and architects.",
    "Requirements and domain model.",
    "- [Software Requirements Specification](../03_Requirements/SOFTWARE_REQUIREMENTS_SPECIFICATION.md)",
    ["## Rule Areas", "", "- Patient identity", "- Billing accuracy", "- Auditability", "- Workflow approval"]
)

files["docs/24_HOS_Development_Intelligence/CLINICAL_RULES.md"] = build_doc(
    "Clinical Rules",
    "Document clinical governance considerations.",
    "The document captures baseline clinical safety and workflow rules.",
    "Clinical informatics teams and architects.",
    "Business rules and requirements.",
    "- [Business Rules](BUSINESS_RULES.md)\n- [Module Index](../12_Module_Specifications/MODULE_INDEX.md)",
    ["## Rule Areas", "", "- Order validation", "- Patient safety checkpoints", "- Role-based access to clinical data"]
)

files["docs/24_HOS_Development_Intelligence/ARCHITECTURE_KNOWLEDGE.md"] = build_doc(
    "Architecture Knowledge",
    "Preserve architectural context and operating assumptions.",
    "This knowledge base supports continuity across team changes.",
    "Architects and maintainers.",
    "Architecture principles and design patterns.",
    "- [Architecture Principles](../04_Architecture/ARCHITECTURE_PRINCIPLES.md)",
    ["## Knowledge Areas", "", "- Service boundaries", "- Integration patterns", "- Platform configuration model", "- Scaling assumptions"]
)

files["docs/24_HOS_Development_Intelligence/LESSONS_LEARNED.md"] = build_doc(
    "Lessons Learned",
    "Record important lessons from implementation work.",
    "The document should be updated as the project evolves.",
    "Team leads and contributors.",
    "Architecture knowledge and retrospectives.",
    "- [Architecture Knowledge](ARCHITECTURE_KNOWLEDGE.md)",
    ["## Initial Lessons", "", "- Documentation quality reduces rework", "- Modular boundaries improve maintainability", "- Security controls should be planned early"]
)

files["docs/24_HOS_Development_Intelligence/COMMON_PITFALLS.md"] = build_doc(
    "Common Pitfalls",
    "Document recurring risks and failures to avoid.",
    "This avoids repeating avoidable mistakes in future work.",
    "Contributors and reviewers.",
    "Lessons learned.",
    "- [Lessons Learned](LESSONS_LEARNED.md)",
    ["## Common Pitfalls", "", "- Over-customizing the platform", "- Weak domain boundaries", "- Insufficient test coverage", "- Poor change documentation"]
)

files["docs/24_HOS_Development_Intelligence/AI_CONTEXT.md"] = build_doc(
    "AI Context",
    "Provide context for AI-assisted engineering on the repository.",
    "This file helps maintain consistent AI guidance and protection of project intent.",
    "AI assistants and contributors.",
    "AI development playbook and coding standards.",
    "- [AI Development Playbook](../23_AI_Engineering/00_AI_DEVELOPMENT_PLAYBOOK.md)\n- [Coding Standards](CODING_STANDARDS.md)",
    ["## AI Context", "", "- Repository purpose", "- Architectural guardrails", "- Security restrictions", "- Delivery expectations"]
)

for rel_path, content in files.items():
    path = ROOT / rel_path
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")

print(f"Created {len(files)} files under {ROOT}")
