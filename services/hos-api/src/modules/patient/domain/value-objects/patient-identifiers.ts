import { BaseValueObject } from '../../../../shared/domain';
import { PatientDomainError } from '../errors/patient-domain.error';
import {
  IdentifierStatus,
  PatientIdentifierType,
} from '../enums/patient.enums';
import { normalizeRequiredText } from './value-object.utils';

interface PatientIdProperties {
  readonly value: string;
}

/** Technical, non-semantic identity of a Patient aggregate. */
export class PatientId extends BaseValueObject<PatientIdProperties> {
  /** Creates a PatientId from a canonical UUID. */
  static create(value: string): PatientId {
    const normalized = value.trim().toLowerCase();

    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
        normalized,
      )
    ) {
      throw new PatientDomainError(
        'PatientId must be a canonical UUID.',
        'PATIENT_INVALID_ID',
      );
    }

    return new PatientId({ value: normalized });
  }

  /** Returns the canonical UUID string. */
  get value(): string {
    return this.properties.value;
  }

  private constructor(properties: PatientIdProperties) {
    super(properties);
  }
}

interface HumanIdentifierProperties {
  readonly value: string;
}

/** Human-readable enterprise identifier governed by JUTH policy. */
export class EnterprisePatientNumber extends BaseValueObject<HumanIdentifierProperties> {
  /** Creates an enterprise patient number without prescribing a local format. */
  static create(value: string): EnterprisePatientNumber {
    return new EnterprisePatientNumber({
      value: normalizeIdentifier(value, 'EnterprisePatientNumber'),
    });
  }

  /** Returns the immutable enterprise identifier. */
  get value(): string {
    return this.properties.value;
  }

  private constructor(properties: HumanIdentifierProperties) {
    super(properties);
  }
}

/** JUTH operational Medical Record Number or hospital number. */
export class HospitalNumber extends BaseValueObject<HumanIdentifierProperties> {
  /** Creates an MRN without embedding an unapproved facility-specific format. */
  static create(value: string): HospitalNumber {
    return new HospitalNumber({
      value: normalizeIdentifier(value, 'HospitalNumber'),
    });
  }

  /** Returns the immutable MRN or hospital number. */
  get value(): string {
    return this.properties.value;
  }

  private constructor(properties: HumanIdentifierProperties) {
    super(properties);
  }
}

export interface PatientIdentifierProperties {
  readonly type: PatientIdentifierType;
  readonly value: string;
  readonly assigningAuthority: string;
  readonly status: IdentifierStatus;
  readonly facilityId?: string;
}

/** Typed patient identifier with authority and lifecycle provenance. */
export class PatientIdentifier extends BaseValueObject<PatientIdentifierProperties> {
  /** Creates a typed identifier for an approved assigning authority. */
  static create(properties: PatientIdentifierProperties): PatientIdentifier {
    return new PatientIdentifier({
      ...properties,
      value: normalizeIdentifier(properties.value, 'PatientIdentifier'),
      assigningAuthority: normalizeRequiredText(
        properties.assigningAuthority,
        'assigningAuthority',
      ),
      facilityId: properties.facilityId?.trim() || undefined,
    });
  }

  /** Returns the typed identifier category. */
  get type(): PatientIdentifierType {
    return this.properties.type;
  }

  /** Returns the normalized identifier value. */
  get value(): string {
    return this.properties.value;
  }

  /** Returns the assigning authority. */
  get assigningAuthority(): string {
    return this.properties.assigningAuthority;
  }

  /** Returns the identifier lifecycle status. */
  get status(): IdentifierStatus {
    return this.properties.status;
  }

  /** Returns the optional facility scope of the identifier. */
  get facilityId(): string | undefined {
    return this.properties.facilityId;
  }

  private constructor(properties: PatientIdentifierProperties) {
    super(properties);
  }
}

function normalizeIdentifier(value: string, field: string): string {
  const normalized = normalizeRequiredText(value, field);

  if (normalized.length > 64 || /\s/.test(normalized)) {
    throw new PatientDomainError(
      `${field} must be a non-spaced value of 64 characters or fewer.`,
      'PATIENT_INVALID_IDENTIFIER',
      { field },
    );
  }

  return normalized;
}
