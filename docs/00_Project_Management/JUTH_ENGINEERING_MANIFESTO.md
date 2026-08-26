# JUTH Enterprise Hospital Operating System (JUTH HOS)

## JUTH Engineering Manifesto

**Document ID:** JUTH-ENGINEERING-MANIFESTO
**Version:** 1.0
**Status:** Approved Draft
**Authority:** Chief Software Architect
**Applies To:** All JUTH HOS engineering, architecture, documentation, security, operations, data, and AI-assisted development work

## Preamble

The Jos University Teaching Hospital Enterprise Hospital Operating System exists to strengthen the work of the hospital and the care of the people it serves. It is an institutional undertaking, not merely a software product. Its value will be measured by safer care, clearer clinical work, stronger accountability, better institutional memory, and the ability of JUTH to improve continuously.

This Manifesto expresses the philosophy that shall guide the platform across decades of development. It complements the [Enterprise Architecture and Development Constitution](JUTH_ENTERPRISE_ARCHITECTURE_AND_DEVELOPMENT_CONSTITUTION/README.md) and does not replace approved architectural decisions, clinical policy, legal requirements, or operational governance.

## 1. Our Mission

JUTH is building an in-house Enterprise Hospital Operating System to improve healthcare delivery through technology that is trustworthy, usable, secure, and maintainable.

The mission is not merely digitization. The objective is transformation: the thoughtful improvement of patient care, clinical efficiency, institutional memory, accountability, safety, education, research, and long-term sustainability.

JUTH HOS shall help the hospital to:

- Give healthcare workers timely and trustworthy information.
- Preserve the complete longitudinal story of a patient's care.
- Reduce avoidable administrative and clinical work.
- Support coordinated care across departments and facilities.
- Make responsibility, authorship, decisions, and changes traceable.
- Strengthen teaching, research, quality improvement, and public health work.
- Create a platform that JUTH can understand, operate, improve, and govern itself.

Technology is successful only when it improves the work of the hospital and the experience and safety of the patient.

## 2. Our Vision

JUTH HOS shall become:

- The official Enterprise Hospital Operating System for Jos University Teaching Hospital.
- A platform maintained and governed by JUTH.
- Independent of proprietary vendor control for its institutional knowledge and core capabilities.
- Capable of serving the hospital for decades.
- Expandable without architectural redesign.
- A benchmark for safe, maintainable healthcare software in Nigeria.
- A foundation for statewide healthcare integration and future national interoperability.

The platform shall remain useful as departments, facilities, regulations, clinical specialties, enterprise functions, technologies, and generations of engineers change. Its architecture must therefore preserve continuity while allowing disciplined evolution.

## 3. The Digital Patient Folder Philosophy

The traditional paper patient folder remains the conceptual model for the Enterprise Hospital Operating System. It represents the institutional expectation that one patient has one continuing record of care, even when care is delivered by different people, departments, clinics, facilities, or generations of staff.

Every patient shall have one lifelong digital folder identity within the applicable enterprise and facility governance model. Every clinical interaction extends the same history. Nothing should become fragmented, disconnected, or invisible merely because it was created in another department or system.

The digital folder shall make the patient's story searchable, understandable, and auditable. Registration, consultations, admissions, emergency visits, laboratory work, radiology, procedures, operations, medications, referrals, follow-up, discharge, correspondence, consent, attachments, scanned documents, billing references, and audit history must be linked to the correct patient and the appropriate encounter or service context.

The digital folder is a continuity philosophy, not a reason to create one unbounded module. Each bounded context owns its facts and workflows, but every patient interaction must preserve a canonical Patient reference, provenance, lifecycle, historical relationship, and access trail. The folder must remain readable even decades later.

This principle is defined in greater architectural detail in the [Enterprise Patient Workspace volume](JUTH_ENTERPRISE_ARCHITECTURE_AND_DEVELOPMENT_CONSTITUTION/Volume-05-Enterprise-Patient-Workspace.md) and the approved Patient Domain Blueprint.

## 4. Lessons from SmartClinic

The development of JUTH HOS is informed by the operational lessons identified through SmartClinic and legacy hospital workflow analysis. These lessons are institutional knowledge. They are not treated as isolated product complaints; they are signals of architectural failure that the new platform is intentionally designed to eliminate.

JUTH HOS shall not reproduce:

- Slow login that delays the beginning of care.
- Slow patient search that encourages repeated registration.
- Slow page loading that interrupts busy clinics.
- Poor scalability under increasing patients, departments, history, and facilities.
- Performance degradation over time caused by uncontrolled data and query growth.
- Duplicate patient records that fragment clinical history.
- Poor audit trails that make actions and responsibility difficult to reconstruct.
- Fragmented workflows that force repeated data entry and manual coordination.
- Hidden history that prevents staff from seeing relevant previous care.
- Hybrid paper workflows with no reliable reconciliation path.
- Paper prescriptions disconnected from pharmacy and medication history.
- Paper laboratory requests separated from results and filing.
- Paper radiology requests separated from reports and imaging records.
- Payment synchronization failures that create conflicting financial states.
- Consultation delays caused by stale or contradictory payment information.
- Weak interoperability with clinical, financial, diagnostic, and external systems.
- Manual workarounds that conceal defects and weaken accountability.
- Difficult maintenance that makes safe improvement expensive.
- Dependence on a vendor for essential institutional knowledge or evolution.

These problems shall never be accepted as normal operating conditions. Where a limitation is discovered, it shall be recorded, measured, assigned to an owner, and addressed through the appropriate engineering, clinical, operational, security, or architectural process.

## 5. Engineering Values

The following values govern every future decision:

### Clinical Safety

The system must reduce the risk of wrong-patient selection, missed history, unfiled results, ambiguous medication records, unauthorized disclosure, and untraceable changes.

### Patient First

Patient dignity, continuity, safety, privacy, and access to appropriate care take precedence over technical convenience.

### Performance First

Fast and predictable software is part of safe hospital operations. Performance concerns must be addressed at design time, not postponed until users are already suffering.

### Accuracy

Identity, clinical evidence, timestamps, provenance, authorship, financial references, and history must be preserved faithfully.

### Reliability

The platform must behave predictably during normal use, retries, dependency outages, recovery, and approved downtime procedures.

### Auditability

Material actions and access must be reconstructable. Accountability is a clinical, legal, operational, and institutional requirement.

### Security

Confidentiality, integrity, availability, least privilege, secure defaults, and fail-closed behavior are foundational capabilities.

### Scalability

The platform must support the growth of JUTH in patients, records, users, services, facilities, integrations, and operational complexity.

### Maintainability

Future JUTH engineers must be able to understand, operate, test, and improve the system without depending on undocumented personal knowledge.

### Extensibility

New capabilities must integrate through explicit boundaries without rewriting existing modules or weakening their ownership.

### Interoperability

The platform must exchange information through versioned, governed contracts and remain ready for FHIR, HL7, DICOM, and enterprise integration.

### Resilience

The system must degrade safely, recover deliberately, preserve evidence, and support reconciliation when dependencies are unavailable.

### Simplicity

The simplest design that preserves safety, auditability, maintainability, and future growth is preferred.

### Institutional Ownership

JUTH owns the platform's purpose, architectural knowledge, governance, and long-term direction.

### Long-Term Sustainability

Decisions shall be made for the hospital's continuing needs, not only for one sprint, one screen, one vendor, or one generation of developers.

## 6. Performance Philosophy

Performance is a clinical requirement. Fast software improves patient care by reducing waiting, interruptions, repeated work, and unsafe workarounds. The system should feel responsive even under heavy hospital workloads and long patient histories.

Future engineers shall prioritize:

- Fast startup.
- Fast and reliable login.
- Fast patient search.
- Fast folder and patient-context opening.
- Fast, durable saving.
- Fast navigation between related work.
- Efficient database access with bounded queries and appropriate indexes.
- Caching where it is safe, observable, and governed by source-version and invalidation rules.
- Asynchronous processing for work that does not need to block frontline care.
- Background processing for projections, reconciliation, indexing, document work, and data-quality analysis.
- Continuous performance monitoring and meaningful operational thresholds.

Performance optimization must not bypass clinical validation, authorization, audit, transaction integrity, or data ownership. Speed and safety are designed together.

## 7. Paper-Free Healthcare

The long-term objective is a paper-free clinical environment. Digital workflows shall progressively cover:

- Consultation.
- Laboratory.
- Radiology.
- Pharmacy.
- Medication administration.
- Clinical documentation.
- Requests and orders.
- Results and verified reports.
- Referrals and responses.
- Discharge and follow-up.
- Consents where legally and operationally permitted.

Paper should exist only where legally required or during an approved downtime procedure. Paper used for downtime or legal purposes must have controlled ownership, patient and record-number linkage, custody or location, filing status, reconciliation, and audit evidence. It must not become a permanently disconnected parallel record.

## 8. Enterprise Billing Principles

JUTH HOS shall have one enterprise payment ledger, one authoritative payment status, and one source of financial truth. Billing and Finance own that truth through the appropriate bounded context.

Clinical, departmental, pharmacy, laboratory, radiology, theatre, admission, and other modules may create billable references or consume an authorized payment status. They must not maintain duplicate payment tracking or module-specific payment states that compete with the enterprise ledger.

Payment updates shall propagate throughout the hospital through governed, versioned contracts and events. Handling must be idempotent and must support delayed responses, reversals, reconciliation, and dependency failure.

This centralized model eliminates SmartClinic payment synchronization problems by preventing multiple modules from independently deciding whether payment has occurred. A consultation or other care workflow must not be blocked by a stale local payment view. Where policy requires payment confirmation, the workflow must use the enterprise status and show an explicit, auditable uncertainty state when the Finance boundary is unavailable.

## 9. Enterprise Prescribing Principles

Prescribing shall be fully electronic. The target operating model contains:

- No handwritten prescriptions for normal operation.
- No permanent hybrid prescription workflow.
- Complete medication history linked to the patient and relevant encounter.
- A clear audit trail for prescribing, amendment, cancellation, dispensing, and administration.
- Readiness for clinical decision support and drug interaction checking.
- Readiness for barcode verification.
- Readiness for medication administration recording.

An authorized clinician prescribes electronically. Pharmacy receives the governed prescription through a published contract or event. Medication history updates through the authoritative prescribing and dispensing workflows, and administration is recorded as a distinct, attributable event. Clinical and pharmacy rules remain owned by their appropriate contexts; the institutional requirement is continuity, traceability, and safe electronic exchange.

## 10. Modular Enterprise Architecture

Every future module must plug into the enterprise without rewriting existing modules. The initial deployment may be a modular monolith, but boundaries must be explicit enough to support future independent deployment and microservice extraction where justified.

Future capabilities may include:

- Clinical services.
- Administrative services.
- Finance.
- Payroll.
- Human Resources.
- Inventory.
- Procurement.
- Fleet.
- Biomedical and engineering services.
- Research.
- Teaching.
- Analytics.
- Artificial Intelligence.
- Statewide health platform capabilities.
- National interoperability.

Expansion shall not require redesign of the platform. New bounded contexts must use published interfaces, domain events, integration events, versioned APIs, anti-corruption layers, and explicit ownership. Direct database coupling between modules is prohibited.

## 11. Clinical User Experience

Clinicians and hospital workers are the primary users of the operational platform. Software should reduce workload, not transfer technical complexity to the people delivering care.

Every workflow should:

- Require as few clicks as safely possible.
- Minimize unnecessary navigation.
- Support busy clinics and high-volume service points.
- Reflect real hospital workflows, responsibilities, handoffs, and terminology.
- Keep patient identity, MRN or hospital number, encounter, location, and relevant context clear.
- Make history discoverable without hiding it behind departmental silos.
- Load progressively and open quickly.
- Support keyboard navigation where appropriate.
- Reduce cognitive load and avoid unnecessary interruptions.

Clinicians must never be forced to think like software engineers. The platform must express safe hospital work in a way that is understandable to the people performing it. When a workflow is difficult, the first question is whether the design reflects the hospital rather than whether the user has adapted sufficiently to the software.

## 12. AI Philosophy

JUTH HOS shall be ready for responsible future use of AI in:

- Clinical summarization.
- Decision support.
- Research.
- Analytics.
- Document extraction.
- Voice documentation.
- Population health.
- Predictive healthcare.
- Identity-resolution assistance and duplicate detection.

AI augments clinicians and authorized staff; AI never replaces clinical judgment or institutional accountability. AI suggestions must be explainable to the extent appropriate for their risk, attributable, auditable, versioned, and safe when the model or external service is unavailable.

AI logic shall not be embedded into the core domain as an invisible decision-maker. AI capabilities shall integrate through controlled extension points and published contracts. An authorized human or approved deterministic process remains responsible for decisions that affect patient identity, clinical care, access, billing, or the legal medical record.

## 13. Institutional Ownership

This project belongs to JUTH. Its knowledge must remain inside the institution and be available to the teams responsible for its care.

Documentation is a first-class deliverable. Architecture, workflows, decisions, operational lessons, data ownership, security responsibilities, and known limitations must be recorded in the repository and maintained through governance.

The architecture must outlive individual developers, vendors, contractors, and leadership cycles. Future engineers should understand the system without relying on prior conversations, undocumented assumptions, or the memory of one person. An engineer leaving the project must not take the institutional understanding of the platform with them.

Institutional ownership also means honest stewardship. JUTH teams must record uncertainty, surface risk, preserve historical evidence, review changes, and resist shortcuts that create hidden dependency on a person, a vendor, or a temporary implementation detail.

## 14. The JUTH Engineering Pledge

Every engineer, architect, analyst, reviewer, operator, contractor, and AI-assisted contributor working on JUTH HOS commits to:

1. Improving healthcare through responsible engineering.
2. Protecting patients, their privacy, their dignity, and the integrity of their records.
3. Writing maintainable software and documentation that future JUTH teams can understand.
4. Designing for decades, not months.
5. Avoiding technical debt where practical and recording unavoidable debt honestly.
6. Documenting architectural decisions and respecting the approved governance process.
7. Preserving institutional knowledge, operational lessons, and historical context.
8. Building software that clinicians and hospital workers can use with confidence.
9. Refusing to hide defects, unsafe assumptions, unauthorized access, or broken continuity behind a successful build.
10. Creating technology that strengthens JUTH as a teaching hospital, research institution, and national healthcare leader.

This pledge is a commitment to the hospital and the people it serves. Working software is necessary, but it is not sufficient. The standard is software that is safe, understandable, accountable, useful, and worthy of becoming part of JUTH's institutional memory.

## Governance References

- [Enterprise Architecture and Development Constitution](JUTH_ENTERPRISE_ARCHITECTURE_AND_DEVELOPMENT_CONSTITUTION/README.md)
- [Volume 00: Vision, Mission and Governance](JUTH_ENTERPRISE_ARCHITECTURE_AND_DEVELOPMENT_CONSTITUTION/Volume-00-Vision-Mission-Governance.md)
- [Volume 05: Enterprise Patient Workspace](JUTH_ENTERPRISE_ARCHITECTURE_AND_DEVELOPMENT_CONSTITUTION/Volume-05-Enterprise-Patient-Workspace.md)
- [Volume 06: Security and IAM](JUTH_ENTERPRISE_ARCHITECTURE_AND_DEVELOPMENT_CONSTITUTION/Volume-06-Security-IAM.md)
- [Volume 08: Enterprise Development Standards](JUTH_ENTERPRISE_ARCHITECTURE_AND_DEVELOPMENT_CONSTITUTION/Volume-08-Development-Standards.md)
- [Volume 11: AI Engineering Governance](JUTH_ENTERPRISE_ARCHITECTURE_AND_DEVELOPMENT_CONSTITUTION/Volume-11-AI-Engineering-Governance.md)
- [Patient Domain Blueprint](../02_Domain_Blueprints/Patient_Domain_Blueprint.md)

**End of Document**
