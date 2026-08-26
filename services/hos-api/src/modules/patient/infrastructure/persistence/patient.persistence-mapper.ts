import { Prisma } from '@prisma/client';

import { InfrastructureException } from '../../../../filters/exceptions';
import type { Clock } from '../../../../shared/domain';
import {
  GenderCode,
  IdentifierStatus,
  PatientIdentifierType,
  PatientStatus,
  Patient,
  DateOfBirth,
  EmailAddress,
  EnterprisePatientNumber,
  Gender,
  HospitalNumber,
  NextOfKin,
  PatientId,
  PatientIdentifier,
  PatientName,
  PhoneNumber,
  Provenance,
  ResidentialAddress,
} from '../../domain';

/** Patient persistence record including normalized identity identifiers. */
export type PatientPersistenceRecord = Prisma.PatientGetPayload<{
  include: { identifiers: true };
}>;

/** Maps the Patient aggregate to and from the Prisma persistence model. */
export class PatientPersistenceMapper {
  constructor(private readonly clock: Clock) {}

  /** Maps a Patient aggregate into a Prisma create input. */
  toCreateData(patient: Patient): Prisma.PatientCreateInput {
    return {
      id: patient.patientId.value,
      enterprisePatientNumber: patient.enterprisePatientNumber.value,
      hospitalNumber: patient.hospitalNumber.value,
      ...this.toDemographicData(patient),
      status: patient.status,
      provenance: toInputJson(patient.provenance.value),
      version: patient.version,
      identifiers: {
        create: patient.identifiers.map((identifier) => ({
          type: identifier.type,
          value: identifier.value,
          assigningAuthority: identifier.assigningAuthority,
          status: identifier.status,
          facilityId: identifier.facilityId,
        })),
      },
    };
  }

  /** Maps mutable Patient state into a Prisma update input. */
  toUpdateData(patient: Patient): Prisma.PatientUpdateInput {
    return {
      enterprisePatientNumber: patient.enterprisePatientNumber.value,
      hospitalNumber: patient.hospitalNumber.value,
      ...this.toDemographicData(patient),
      status: patient.status,
      provenance: toInputJson(patient.provenance.value),
      version: patient.version,
      updatedAt: new Date(patient.updatedAt),
    };
  }

  /** Rehydrates a Patient aggregate without recording a domain event. */
  fromPersistence(record: PatientPersistenceRecord): Patient {
    return Patient.rehydrate({
      patientId: PatientId.create(record.id),
      enterprisePatientNumber: EnterprisePatientNumber.create(
        record.enterprisePatientNumber,
      ),
      hospitalNumber: HospitalNumber.create(record.hospitalNumber),
      name: PatientName.create({
        familyName: record.familyName,
        givenNames: record.givenNames,
        otherNames: record.otherNames ?? undefined,
        prefix: record.namePrefix ?? undefined,
        suffix: record.nameSuffix ?? undefined,
        use: record.nameUse ?? undefined,
      }),
      dateOfBirth: DateOfBirth.fromIso(
        record.dateOfBirth.toISOString().slice(0, 10),
        this.clock.now(),
      ),
      gender: Gender.create(enumValue(record.gender, GenderCode, 'gender')),
      phoneNumber: record.phoneNumber
        ? PhoneNumber.create(record.phoneNumber)
        : undefined,
      emailAddress: record.emailAddress
        ? EmailAddress.create(record.emailAddress)
        : undefined,
      residentialAddress: addressFromJson(record.residentialAddress),
      nextOfKin: nextOfKinFromJson(record.nextOfKin),
      identifiers: record.identifiers.map((identifier) =>
        PatientIdentifier.create({
          type: enumValue(
            identifier.type,
            PatientIdentifierType,
            'identifier.type',
          ),
          value: identifier.value,
          assigningAuthority: identifier.assigningAuthority,
          status: enumValue(
            identifier.status,
            IdentifierStatus,
            'identifier.status',
          ),
          facilityId: identifier.facilityId ?? undefined,
        }),
      ),
      status: enumValue(record.status, PatientStatus, 'status'),
      provenance: provenanceFromJson(record.provenance),
      version: record.version,
      updatedAt: record.updatedAt.toISOString(),
    });
  }

  private toDemographicData(
    patient: Patient,
  ): Pick<
    Prisma.PatientCreateInput,
    | 'familyName'
    | 'givenNames'
    | 'otherNames'
    | 'namePrefix'
    | 'nameSuffix'
    | 'nameUse'
    | 'dateOfBirth'
    | 'gender'
    | 'phoneNumber'
    | 'emailAddress'
    | 'residentialAddress'
    | 'nextOfKin'
  > {
    return {
      familyName: patient.name.familyName,
      givenNames: patient.name.givenNames,
      otherNames: patient.name.otherNames,
      namePrefix: patient.name.prefix,
      nameSuffix: patient.name.suffix,
      nameUse: patient.name.use,
      dateOfBirth: new Date(`${patient.dateOfBirth.value}T00:00:00.000Z`),
      gender: patient.gender.code,
      phoneNumber: patient.phoneNumber?.value,
      emailAddress: patient.emailAddress?.value,
      residentialAddress: patient.residentialAddress
        ? toInputJson(patient.residentialAddress.value)
        : Prisma.JsonNull,
      nextOfKin: patient.nextOfKin
        ? toInputJson(nextOfKinToPlainObject(patient.nextOfKin))
        : Prisma.JsonNull,
    };
  }
}

function nextOfKinToPlainObject(nextOfKin: NextOfKin): Record<string, unknown> {
  return {
    name: nextOfKin.name,
    relationship: nextOfKin.relationship,
    phoneNumber: nextOfKin.phoneNumber?.value,
    address: nextOfKin.address?.value,
  };
}

function addressFromJson(
  value: Prisma.JsonValue | null,
): ResidentialAddress | undefined {
  if (isPrismaJsonNull(value)) return undefined;
  const object = asObject(value);
  if (!object) return undefined;
  return ResidentialAddress.create({
    line1: requiredString(object, 'line1'),
    line2: optionalString(object, 'line2'),
    locality: requiredString(object, 'locality'),
    region: requiredString(object, 'region'),
    country: requiredString(object, 'country'),
    postalCode: optionalString(object, 'postalCode'),
  });
}

function nextOfKinFromJson(
  value: Prisma.JsonValue | null,
): NextOfKin | undefined {
  if (isPrismaJsonNull(value)) return undefined;
  const object = asObject(value);
  if (!object) return undefined;
  const phoneNumber = optionalString(object, 'phoneNumber');
  const addressValue = object.address;
  return NextOfKin.create({
    name: requiredString(object, 'name'),
    relationship: requiredString(object, 'relationship'),
    phoneNumber: phoneNumber ? PhoneNumber.create(phoneNumber) : undefined,
    address: addressFromJson(isJsonValue(addressValue) ? addressValue : null),
  });
}

function provenanceFromJson(value: Prisma.JsonValue): Provenance {
  const object = asObject(value);
  if (!object) {
    throw new InfrastructureException('Stored patient provenance is invalid.');
  }
  return Provenance.create({
    source: requiredString(object, 'source'),
    recordedBy: requiredString(object, 'recordedBy'),
    recordedAt: requiredString(object, 'recordedAt'),
    facilityId: requiredString(object, 'facilityId'),
    tenantId: requiredString(object, 'tenantId'),
    reason: requiredString(object, 'reason'),
  });
}

function enumValue<T extends string>(
  value: string,
  enumObject: Record<string, T>,
  field: string,
): T {
  const values = Object.values(enumObject);
  if (values.includes(value as T)) return value as T;
  throw new InfrastructureException(`Stored patient ${field} is invalid.`);
}

function toInputJson(value: unknown): Prisma.InputJsonValue {
  if (value === null) {
    throw new InfrastructureException(
      'Null JSON values must use Prisma.JsonNull.',
    );
  }
  if (typeof value === 'string' || typeof value === 'boolean') return value;
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (Array.isArray(value)) return value.map((item) => toInputJson(item));
  if (isRecord(value)) {
    const object: Record<string, Prisma.InputJsonValue> = {};
    for (const [key, entry] of Object.entries(value)) {
      if (entry !== undefined) object[key] = toInputJson(entry);
    }
    return object;
  }
  throw new InfrastructureException(
    'Patient JSON persistence value is invalid.',
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isJsonValue(value: unknown): value is Prisma.JsonValue {
  return (
    value === null ||
    typeof value === 'string' ||
    typeof value === 'boolean' ||
    typeof value === 'number' ||
    Array.isArray(value) ||
    isRecord(value)
  );
}

function isPrismaJsonNull(value: unknown): boolean {
  return value === Prisma.JsonNull;
}

function asObject(
  value: Prisma.JsonValue | null,
): Record<string, unknown> | undefined {
  return isRecord(value) ? value : undefined;
}

function requiredString(
  object: Record<string, unknown>,
  field: string,
): string {
  const value = object[field];
  if (typeof value !== 'string') {
    throw new InfrastructureException(
      `Stored patient JSON field is invalid: ${field}.`,
    );
  }
  return value;
}

function optionalString(
  object: Record<string, unknown>,
  field: string,
): string | undefined {
  const value = object[field];
  return typeof value === 'string' ? value : undefined;
}
