# Authentication and Authorization

## Status

Version 1.0 Enterprise Architecture Baseline.

## Purpose

This document defines IAM expectations for authentication and authorization in JUTH HOS.

## Identity Categories

Supported identity categories include:

- Healthcare workers.
- Administrative staff.
- Patients.
- External partners.
- Service accounts.
- Integration clients.

## Authentication

Authentication providers shall be pluggable. Supported readiness includes:

- JWT.
- Refresh tokens.
- LDAP.
- Active Directory.
- OAuth 2.0.
- OpenID Connect.
- SAML.
- API keys.
- Service accounts.
- Multi-factor authentication.

## Authorization

Authorization decisions shall evaluate:

- Role.
- Permission.
- Claim.
- Policy.
- Department scope.
- Facility scope.
- Tenant scope.
- Session scope.

Authorization defaults to deny unless explicitly permitted.

## Permissions

Permissions represent discrete capabilities. Permissions must be centrally registered and reviewed.

## Session Management

Sessions shall support concurrent session management, idle timeout, absolute timeout, revocation, device awareness, token rotation, and refresh token revocation.

## Password Policy

Password architecture shall support secure hashing, complexity policies, history, recovery workflows, and plaintext password prohibition.

## Audit Events

IAM shall publish audit events for authentication, authorization, credential, role, permission, and session changes.

## API Access

API access requires authenticated identity and authorization except for explicitly approved public endpoints.

## Governance

IAM implementation changes require security review. Provider selection or authentication strategy changes may require ADR approval.

