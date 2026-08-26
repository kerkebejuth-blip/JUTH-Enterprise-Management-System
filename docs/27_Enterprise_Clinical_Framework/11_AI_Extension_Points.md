# AI Extension Points for Clinical Modules

## Purpose

AI capabilities may extend the Enterprise Clinical Framework, but AI is not a bounded-context owner and must not be embedded in core domain invariants. Clinical decisions remain the responsibility of authorised healthcare professionals.

## Approved Extension Points

Future modules may provide governed interfaces for:

- Clinical summaries.
- Voice documentation assistance.
- Duplicate-patient detection and review support.
- Clinical coding assistance.
- Decision-support suggestions.
- Population-health analysis.
- Research support.
- Risk prediction.
- Document and scanned-record extraction.

These capabilities are advisory unless a separately approved clinical governance process establishes another use.

## Safety Contract

An AI response must be distinguishable from an authoritative clinical record. It must preserve:

- Source records and retrieval time.
- Model and prompt or policy version where applicable.
- Confidence or uncertainty indicators.
- Human reviewer and disposition.
- Input data classification and consent constraints.
- Correlation and audit information.
- A clear path to reject, correct, or ignore the suggestion.

The system must not silently write an AI-generated conclusion into a clinical record. A clinician explicitly accepts or edits any content that becomes part of the legal record.

## Architectural Boundary

AI adapters belong outside the domain core and communicate through application ports or approved platform services. They must not change patient identity, encounter state, medication safety rules, authorization decisions, or other domain invariants without a governed human-controlled workflow.

## Operational Controls

AI features require data minimization, access control, secure processing, retention rules, monitoring for failure and drift, explainability appropriate to the use, and documented fallback behaviour. If an AI service is unavailable, the clinical workflow must remain safe and usable without it.

## Future Evolution

The framework supports multiple models and providers through replaceable adapters. Provider choice, model version, hosting, and data residency may evolve without changing clinical module contracts. Any capability affecting clinical safety, privacy, or legal-record content requires architecture, security, and clinical review.
