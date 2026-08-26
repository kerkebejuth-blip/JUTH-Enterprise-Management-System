import type { Mapper } from '../../../../shared/domain';
import {
  DateOfBirth,
  EmailAddress,
  EnterprisePatientNumber,
  Gender,
  HospitalNumber,
  NextOfKin,
  Patient,
  PatientIdentifier,
  PatientName,
  PhoneNumber,
  Provenance,
  ResidentialAddress,
  type PatientCreateInput,
  type PatientUpdateInput,
} from '../../domain';
import type {
  PatientDetailDto,
  PatientIdentifierDto,
  PatientNameDto,
  PatientProvenanceDto,
  PatientSummaryDto,
  RegistrationDto,
  TimelineEntryDto,
  UpdateDto,
} from '../dto';

/** Maps application inputs and Patient aggregates without transport coupling. */
export class PatientMapper implements Mapper<Patient, PatientSummaryDto> {
  /** Maps a Patient aggregate to a compact list projection. */
  toDestination(patient: Patient): PatientSummaryDto {
    return PatientMapper.toSummary(patient);
  }

  /** Converts registration input into domain value objects and primitives. */
  static toCreateInput(
    input: RegistrationDto,
    referenceDate: Date,
  ): PatientCreateInput {
    return {
      enterprisePatientNumber: EnterprisePatientNumber.create(
        input.enterprisePatientNumber,
      ),
      hospitalNumber: HospitalNumber.create(input.hospitalNumber),
      name: PatientMapper.toName(input.name),
      dateOfBirth: PatientMapper.toDateOfBirth(
        input.dateOfBirth,
        referenceDate,
      ),
      gender: Gender.create(input.gender),
      phoneNumber:
        input.phoneNumber === undefined
          ? undefined
          : PhoneNumber.create(input.phoneNumber),
      emailAddress:
        input.emailAddress === undefined
          ? undefined
          : EmailAddress.create(input.emailAddress),
      residentialAddress:
        input.residentialAddress === undefined
          ? undefined
          : ResidentialAddress.create(input.residentialAddress),
      nextOfKin:
        input.nextOfKin === undefined
          ? undefined
          : NextOfKin.create({
              name: input.nextOfKin.name,
              relationship: input.nextOfKin.relationship,
              phoneNumber:
                input.nextOfKin.phoneNumber === undefined
                  ? undefined
                  : PhoneNumber.create(input.nextOfKin.phoneNumber),
              address:
                input.nextOfKin.address === undefined
                  ? undefined
                  : ResidentialAddress.create(input.nextOfKin.address),
            }),
      identifiers: input.identifiers?.map((identifier) =>
        PatientMapper.toIdentifier(identifier),
      ),
      status: input.status,
      provenance: PatientMapper.toProvenance(input.provenance),
    };
  }

  /** Converts an approved update into domain value objects and primitives. */
  static toUpdateInput(
    input: UpdateDto,
    expectedVersion: number,
    referenceDate: Date,
  ): PatientUpdateInput {
    return {
      expectedVersion,
      name:
        input.name === undefined ? undefined : PatientMapper.toName(input.name),
      dateOfBirth:
        input.dateOfBirth === undefined
          ? undefined
          : PatientMapper.toDateOfBirth(input.dateOfBirth, referenceDate),
      gender:
        input.gender === undefined ? undefined : Gender.create(input.gender),
      phoneNumber:
        input.phoneNumber === undefined
          ? undefined
          : PhoneNumber.create(input.phoneNumber),
      emailAddress:
        input.emailAddress === undefined
          ? undefined
          : EmailAddress.create(input.emailAddress),
      residentialAddress:
        input.residentialAddress === undefined
          ? undefined
          : ResidentialAddress.create(input.residentialAddress),
      nextOfKin:
        input.nextOfKin === undefined
          ? undefined
          : NextOfKin.create({
              name: input.nextOfKin.name,
              relationship: input.nextOfKin.relationship,
              phoneNumber:
                input.nextOfKin.phoneNumber === undefined
                  ? undefined
                  : PhoneNumber.create(input.nextOfKin.phoneNumber),
              address:
                input.nextOfKin.address === undefined
                  ? undefined
                  : ResidentialAddress.create(input.nextOfKin.address),
            }),
      provenance: PatientMapper.toProvenance(input.provenance),
    };
  }

  /** Maps a Patient aggregate to a complete identity projection. */
  static toDetail(patient: Patient): PatientDetailDto {
    return {
      ...PatientMapper.toSummary(patient),
      phoneNumber: patient.phoneNumber?.value,
      emailAddress: patient.emailAddress?.value,
      residentialAddress: PatientMapper.toAddressRecord(
        patient.residentialAddress?.value,
      ),
      nextOfKin: patient.nextOfKin
        ? {
            name: patient.nextOfKin.name,
            relationship: patient.nextOfKin.relationship,
            ...(patient.nextOfKin.phoneNumber === undefined
              ? {}
              : { phoneNumber: patient.nextOfKin.phoneNumber.value }),
          }
        : undefined,
      identifiers: patient.identifiers.map((identifier) =>
        PatientMapper.toIdentifierDto(identifier),
      ),
      provenance: patient.provenance.value,
      updatedAt: patient.updatedAt,
    };
  }

  /** Maps a Patient aggregate to the event snapshot expected by ports. */
  static toSnapshot(patient: Patient): {
    readonly patientId: string;
    readonly enterprisePatientNumber: string;
    readonly hospitalNumber: string;
    readonly name: string;
    readonly dateOfBirth: string;
    readonly gender: string;
    readonly status: Patient['status'];
    readonly version: number;
  } {
    return {
      patientId: patient.patientId.value,
      enterprisePatientNumber: patient.enterprisePatientNumber.value,
      hospitalNumber: patient.hospitalNumber.value,
      name: patient.name.displayName,
      dateOfBirth: patient.dateOfBirth.value,
      gender: patient.gender.code,
      status: patient.status,
      version: patient.version,
    };
  }

  /** Maps a generic timeline entry without introducing specialty knowledge. */
  static toTimelineEntry(entry: {
    readonly entryId: string;
    readonly category: string;
    readonly occurredAt: string;
    readonly title: string;
    readonly summary: string;
    readonly source: string;
  }): TimelineEntryDto {
    return { ...entry };
  }

  private static toName(input: PatientNameDto): PatientName {
    return PatientName.create(input);
  }

  private static toDateOfBirth(
    value: string,
    referenceDate: Date,
  ): DateOfBirth {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      throw new Error('dateOfBirth must use YYYY-MM-DD format.');
    }

    return DateOfBirth.fromIso(value, referenceDate);
  }

  static toProvenance(input: PatientProvenanceDto): Provenance {
    return Provenance.create(input);
  }

  private static toIdentifier(input: PatientIdentifierDto): PatientIdentifier {
    return PatientIdentifier.create(input);
  }

  private static toIdentifierDto(
    identifier: PatientIdentifier,
  ): PatientIdentifierDto {
    return {
      type: identifier.type,
      value: identifier.value,
      assigningAuthority: identifier.assigningAuthority,
      status: identifier.status,
    };
  }

  private static toAddressRecord(
    value:
      | Readonly<{
          readonly line1: string;
          readonly line2?: string;
          readonly locality: string;
          readonly region: string;
          readonly country: string;
          readonly postalCode?: string;
        }>
      | undefined,
  ): Readonly<Record<string, string>> | undefined {
    if (value === undefined) {
      return undefined;
    }

    const result: Record<string, string> = {};

    for (const [key, field] of Object.entries(value)) {
      if (field !== undefined) {
        result[key] = field;
      }
    }

    return result;
  }

  static toSummary(patient: Patient): PatientSummaryDto {
    return {
      patientId: patient.patientId.value,
      enterprisePatientNumber: patient.enterprisePatientNumber.value,
      hospitalNumber: patient.hospitalNumber.value,
      displayName: patient.name.displayName,
      dateOfBirth: patient.dateOfBirth.value,
      gender: patient.gender.code,
      status: patient.status,
      version: patient.version,
    };
  }
}
