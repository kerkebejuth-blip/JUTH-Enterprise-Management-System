# JUTH Enterprise Hospital Operating System (JUTH HOS)

Enterprise Architecture & Development Constitution

Volume 06

Security & Identity and Access Management (IAM)

Document ID:  
JUTH-CONSTITUTION-V06

Version:  
1.0

Status:  
Approved Draft

Authority:  
Chief Software Architect

## 1. PURPOSE

This volume defines the constitutional security principles and Identity and Access Management (IAM) architecture governing every application, service, API, user, device, and integration within JUTH HOS.

Security is a platform capability and shall be implemented consistently across the enterprise.

## 2. SECURITY PHILOSOPHY

Security shall be designed into the platform from the beginning rather than added later.

The architecture shall prioritise:

- Clinical safety
- Confidentiality
- Integrity
- Availability
- Accountability
- Auditability
- Least privilege
- Defence in depth
- Secure defaults
- Fail-closed behaviour

## 3. IDENTITY MODEL

Identity represents authenticated actors interacting with the platform.

Supported identity categories include:

- Healthcare workers
- Administrative staff
- Patients
- External partners
- Service accounts
- Integration clients

Authentication mechanisms may evolve independently of the domain model.

## 4. AUTHENTICATION

The platform shall support a pluggable authentication architecture.

Readiness includes:

- JWT
- Refresh Tokens
- LDAP
- Active Directory
- OAuth 2.0
- OpenID Connect
- SAML
- API Keys
- Service Accounts
- Multi-factor authentication

Authentication providers are implementation concerns and shall not require architectural redesign.

## 5. AUTHORIZATION

Authorization is based on layered policy evaluation.

The platform supports:

- Role-Based Access Control (RBAC)
- Policy-Based Access Control (PBAC)
- Claims-based authorization
- Department scope
- Facility scope
- Tenant scope
- Session scope

Authorization decisions shall default to deny unless explicitly permitted.

## 6. PERMISSIONS

Permissions represent discrete capabilities.

Examples include:

- PATIENT_READ
- PATIENT_UPDATE
- LAB_APPROVE
- PHARMACY_DISPENSE
- BILLING_APPROVE

Permission definitions are maintained centrally to ensure consistency.

## 7. SESSION MANAGEMENT

The platform shall support:

- Concurrent session management
- Idle timeout
- Absolute timeout
- Session revocation
- Device awareness
- Token rotation
- Refresh token revocation

## 8. PASSWORD POLICY

Password architecture shall support:

- Secure hashing
- Complexity policies
- Password history
- Expiration rules where required
- Recovery workflows

Credential storage shall never expose plaintext passwords.

## 9. AUDITABILITY

Security-sensitive actions shall be auditable.

Examples include:

- Authentication events
- Authorization failures
- Role changes
- Permission changes
- Password resets
- Token revocation
- Administrative actions

Audit records shall be tamper-evident and retained according to organisational policy.

## 10. API SECURITY

All APIs shall implement consistent security controls including:

- Authentication
- Authorization
- Input validation
- Rate limiting
- Secure transport
- Error handling
- Audit logging

## 11. DATA PROTECTION

Patient information shall be protected throughout its lifecycle.

Security controls shall support:

- Encryption in transit
- Encryption at rest (implementation-dependent)
- Secure backups
- Data integrity
- Controlled disclosure
- Secure deletion policies

## 12. SECURITY GOVERNANCE

Security architecture evolves through approved Architecture Decision Records (ADRs).

Security reviews are mandatory for architectural changes affecting confidentiality, integrity, availability, or clinical safety.

## 13. SUMMARY

Security is a foundational platform capability implemented consistently across all applications and services through layered identity, authentication, authorization, auditing, data protection, and governance.
