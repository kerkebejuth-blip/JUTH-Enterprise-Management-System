import {
  BaseAggregateRoot,
  BusinessRuleEvaluator,
} from '../../../shared/domain';
import { PatientStatus } from './enums/patient.enums';
import { PatientDomainError } from './errors/patient-domain.error';
import {
  PatientArchived,
  PatientMerged,
  PatientRegistered,
  PatientSplit,
  PatientUpdated,
} from './events/patient.events';
import {
  MandatoryPatientDemographicsRule,
  MergeRequiresAuthorizationRule,
  PatientIdentifierUniquenessRule,
  PatientIdentityImmutableRule,
  SplitPreservesProvenanceRule,
} from './rules/patient.rules';
import type {
  AuthorizationEvidence,
  PatientCreateInput,
  PatientDomainDependencies,
  PatientSnapshot,
  PatientRehydrationInput,
  PatientUpdateInput,
} from './patient.types';
import {
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
} from './value-objects';

/**
 * Patient identity aggregate root for the JUTH Patient bounded context.
 *
 * The aggregate owns identity and administrative demographics only. Encounters,
 * clinical facts, records custody, billing, and authentication remain outside
 * this domain boundary and reference the patient through stable contracts.
 */
export class Patient extends BaseAggregateRoot {
  private readonly patientIdValue: PatientId;
  private readonly enterprisePatientNumberValue: EnterprisePatientNumber;
  private readonly hospitalNumberValue: HospitalNumber;
  private nameValue: PatientName;
  private dateOfBirthValue: DateOfBirth;
  private genderValue: Gender;
  private phoneNumberValue: PhoneNumber | undefined;
  private emailAddressValue: EmailAddress | undefined;
  private residentialAddressValue: ResidentialAddress | undefined;
  private nextOfKinValue: NextOfKin | undefined;
  private readonly identifiersValue: readonly PatientIdentifier[];
  private statusValue: PatientStatus;
  private provenanceValue: Provenance;
  private versionValue: number;
  private updatedAtValue: string;

  /** Creates a Patient aggregate and records PatientRegistered. */
  static create(
    input: PatientCreateInput,
    dependencies: PatientDomainDependencies,
  ): Patient {
    const patientId =
      input.patientId ??
      PatientId.create(dependencies.identifierGenerator.generate());
    const identifiers = [...(input.identifiers ?? [])];
    const brokenRules = BusinessRuleEvaluator.brokenRules([
      new MandatoryPatientDemographicsRule(
        input.name,
        input.dateOfBirth,
        input.gender,
      ),
      new PatientIdentifierUniquenessRule(identifiers),
    ]);

    if (brokenRules.length > 0) {
      throw PatientDomainError.fromBrokenRules(brokenRules);
    }

    if (
      ![PatientStatus.Provisional, PatientStatus.Active].includes(input.status)
    ) {
      throw new PatientDomainError(
        'A newly created patient must be provisional or active.',
        'PATIENT_INVALID_INITIAL_STATUS',
      );
    }

    const patient = new Patient({
      patientId,
      enterprisePatientNumber: input.enterprisePatientNumber,
      hospitalNumber: input.hospitalNumber,
      name: input.name,
      dateOfBirth: input.dateOfBirth,
      gender: input.gender,
      phoneNumber: input.phoneNumber,
      emailAddress: input.emailAddress,
      residentialAddress: input.residentialAddress,
      nextOfKin: input.nextOfKin,
      identifiers,
      status: input.status,
      provenance: input.provenance,
      version: 1,
      timestamp: dependencies.clock.nowIso(),
    });

    patient.recordDomainEvent(
      new PatientRegistered(
        dependencies.identifierGenerator.generate(),
        dependencies.clock.now(),
        patient.snapshotWithProvenance(),
        dependencies.eventMetadata,
      ),
    );

    return patient;
  }

  /** Rehydrates a Patient aggregate without recording a domain event. */
  static rehydrate(input: PatientRehydrationInput): Patient {
    if (!Number.isInteger(input.version) || input.version < 1) {
      throw new PatientDomainError(
        'Patient version must be a positive integer during rehydration.',
        'PATIENT_INVALID_VERSION',
      );
    }

    return new Patient({
      patientId: input.patientId,
      enterprisePatientNumber: input.enterprisePatientNumber,
      hospitalNumber: input.hospitalNumber,
      name: input.name,
      dateOfBirth: input.dateOfBirth,
      gender: input.gender,
      phoneNumber: input.phoneNumber,
      emailAddress: input.emailAddress,
      residentialAddress: input.residentialAddress,
      nextOfKin: input.nextOfKin,
      identifiers: input.identifiers,
      status: input.status,
      provenance: input.provenance,
      version: input.version,
      timestamp: input.updatedAt,
    });
  }

  private constructor(input: {
    readonly patientId: PatientId;
    readonly enterprisePatientNumber: EnterprisePatientNumber;
    readonly hospitalNumber: HospitalNumber;
    readonly name: PatientName;
    readonly dateOfBirth: DateOfBirth;
    readonly gender: Gender;
    readonly phoneNumber?: PhoneNumber;
    readonly emailAddress?: EmailAddress;
    readonly residentialAddress?: ResidentialAddress;
    readonly nextOfKin?: NextOfKin;
    readonly identifiers: readonly PatientIdentifier[];
    readonly status: PatientStatus;
    readonly provenance: Provenance;
    readonly version: number;
    readonly timestamp: string;
  }) {
    super(input.patientId.value);
    this.patientIdValue = input.patientId;
    this.enterprisePatientNumberValue = input.enterprisePatientNumber;
    this.hospitalNumberValue = input.hospitalNumber;
    this.nameValue = input.name;
    this.dateOfBirthValue = input.dateOfBirth;
    this.genderValue = input.gender;
    this.phoneNumberValue = input.phoneNumber;
    this.emailAddressValue = input.emailAddress;
    this.residentialAddressValue = input.residentialAddress;
    this.nextOfKinValue = input.nextOfKin;
    this.identifiersValue = [...input.identifiers];
    this.statusValue = input.status;
    this.provenanceValue = input.provenance;
    this.versionValue = input.version;
    this.updatedAtValue = input.timestamp;
  }

  /** Returns the technical Patient identifier value object. */
  get patientId(): PatientId {
    return this.patientIdValue;
  }

  /** Returns the immutable enterprise patient number. */
  get enterprisePatientNumber(): EnterprisePatientNumber {
    return this.enterprisePatientNumberValue;
  }

  /** Returns the immutable JUTH MRN or hospital number. */
  get hospitalNumber(): HospitalNumber {
    return this.hospitalNumberValue;
  }

  /** Returns the current patient name. */
  get name(): PatientName {
    return this.nameValue;
  }

  /** Returns the current date of birth. */
  get dateOfBirth(): DateOfBirth {
    return this.dateOfBirthValue;
  }

  /** Returns the current administrative gender. */
  get gender(): Gender {
    return this.genderValue;
  }

  /** Returns the optional phone number. */
  get phoneNumber(): PhoneNumber | undefined {
    return this.phoneNumberValue;
  }

  /** Returns the optional email address. */
  get emailAddress(): EmailAddress | undefined {
    return this.emailAddressValue;
  }

  /** Returns the optional residential address. */
  get residentialAddress(): ResidentialAddress | undefined {
    return this.residentialAddressValue;
  }

  /** Returns the optional next-of-kin relationship. */
  get nextOfKin(): NextOfKin | undefined {
    return this.nextOfKinValue;
  }

  /** Returns a defensive copy of typed patient identifiers. */
  get identifiers(): readonly PatientIdentifier[] {
    return [...this.identifiersValue];
  }

  /** Returns the current patient lifecycle status. */
  get status(): PatientStatus {
    return this.statusValue;
  }

  /** Returns the optimistic-concurrency version. */
  get version(): number {
    return this.versionValue;
  }

  /** Returns the last update timestamp as an immutable ISO value. */
  get updatedAt(): string {
    return this.updatedAtValue;
  }

  /** Returns the latest identity provenance. */
  get provenance(): Provenance {
    return this.provenanceValue;
  }

  /** Updates approved administrative demographics through one domain operation. */
  updateDemographics(
    input: PatientUpdateInput,
    dependencies: PatientDomainDependencies,
  ): void {
    this.ensureExpectedVersion(input.expectedVersion);

    const nextName = input.name ?? this.nameValue;
    const nextDateOfBirth = input.dateOfBirth ?? this.dateOfBirthValue;
    const nextGender = input.gender ?? this.genderValue;
    const brokenRules = BusinessRuleEvaluator.brokenRules([
      new MandatoryPatientDemographicsRule(
        nextName,
        nextDateOfBirth,
        nextGender,
      ),
      new PatientIdentityImmutableRule(
        this.patientIdValue.value,
        this.patientIdValue.value,
        this.enterprisePatientNumberValue.value,
        this.enterprisePatientNumberValue.value,
        this.hospitalNumberValue.value,
        this.hospitalNumberValue.value,
      ),
    ]);

    if (brokenRules.length > 0) {
      throw PatientDomainError.fromBrokenRules(brokenRules);
    }

    const changedFields = this.changedFields(input);
    this.nameValue = nextName;
    this.dateOfBirthValue = nextDateOfBirth;
    this.genderValue = nextGender;
    this.phoneNumberValue = input.phoneNumber ?? this.phoneNumberValue;
    this.emailAddressValue = input.emailAddress ?? this.emailAddressValue;
    this.residentialAddressValue =
      input.residentialAddress ?? this.residentialAddressValue;
    this.nextOfKinValue = input.nextOfKin ?? this.nextOfKinValue;
    this.provenanceValue = input.provenance;
    this.versionValue += 1;
    this.updatedAtValue = dependencies.clock.nowIso();

    if (changedFields.length > 0) {
      this.recordDomainEvent(
        new PatientUpdated(
          dependencies.identifierGenerator.generate(),
          dependencies.clock.now(),
          {
            patientId: this.patientIdValue.value,
            changedFields,
            version: this.versionValue,
            status: this.statusValue,
            provenance: this.provenanceValue.value,
          },
          dependencies.eventMetadata,
        ),
      );
    }
  }

  /** Moves a patient into controlled archive state. */
  archive(reason: string, dependencies: PatientDomainDependencies): void {
    const normalizedReason = reason.trim();

    if (normalizedReason.length === 0) {
      throw new PatientDomainError(
        'Patient archive requires a reason.',
        'PATIENT_ARCHIVE_REASON_REQUIRED',
      );
    }

    if (this.statusValue === PatientStatus.Merged) {
      throw new PatientDomainError(
        'A merged patient cannot be archived as an independent identity.',
        'PATIENT_INVALID_ARCHIVE_STATE',
      );
    }

    this.statusValue = PatientStatus.Archived;
    this.versionValue += 1;
    this.updatedAtValue = dependencies.clock.nowIso();

    this.recordDomainEvent(
      new PatientArchived(
        dependencies.identifierGenerator.generate(),
        dependencies.clock.now(),
        {
          patientId: this.patientIdValue.value,
          reason: normalizedReason,
          version: this.versionValue,
          status: this.statusValue,
        },
        dependencies.eventMetadata,
      ),
    );
  }

  /** Applies a governed merge decision to this source Patient aggregate. */
  mergeInto(
    survivorPatientId: PatientId,
    authorization: AuthorizationEvidence | undefined,
    provenance: Provenance,
    dependencies: PatientDomainDependencies,
  ): void {
    const brokenRules = BusinessRuleEvaluator.brokenRules([
      new MergeRequiresAuthorizationRule(authorization),
    ]);

    if (survivorPatientId.equals(this.patientIdValue)) {
      throw new PatientDomainError(
        'A patient cannot be merged with itself.',
        'PATIENT_SELF_MERGE',
      );
    }

    if (brokenRules.length > 0) {
      throw PatientDomainError.fromBrokenRules(brokenRules);
    }

    if (
      this.statusValue !== PatientStatus.Active &&
      this.statusValue !== PatientStatus.Inactive
    ) {
      throw new PatientDomainError(
        'Only an active or inactive patient can be merged.',
        'PATIENT_INVALID_MERGE_STATE',
      );
    }

    this.statusValue = PatientStatus.Merged;
    this.provenanceValue = provenance;
    this.versionValue += 1;
    this.updatedAtValue = dependencies.clock.nowIso();

    this.recordDomainEvent(
      new PatientMerged(
        dependencies.identifierGenerator.generate(),
        dependencies.clock.now(),
        {
          sourcePatientId: this.patientIdValue.value,
          survivorPatientId: survivorPatientId.value,
          authorizationReference: authorization?.authorizationReference ?? '',
          reason: authorization?.reason ?? '',
          provenance: provenance.value,
          version: this.versionValue,
        },
        dependencies.eventMetadata,
      ),
    );
  }

  /** Records an approved split while preserving the original provenance. */
  split(
    resultingPatientId: PatientId,
    provenance: Provenance | undefined,
    dependencies: PatientDomainDependencies,
  ): void {
    const brokenRules = BusinessRuleEvaluator.brokenRules([
      new SplitPreservesProvenanceRule(provenance),
    ]);

    if (resultingPatientId.equals(this.patientIdValue)) {
      throw new PatientDomainError(
        'A patient split must produce a different patient identity.',
        'PATIENT_SELF_SPLIT',
      );
    }

    if (brokenRules.length > 0) {
      throw PatientDomainError.fromBrokenRules(brokenRules);
    }

    if (this.statusValue === PatientStatus.Archived) {
      throw new PatientDomainError(
        'An archived patient cannot be split without restoration through policy.',
        'PATIENT_INVALID_SPLIT_STATE',
      );
    }

    if (provenance === undefined) {
      throw new PatientDomainError(
        'Patient split must preserve provenance.',
        'PATIENT_SPLIT_PROVENANCE_REQUIRED',
      );
    }

    this.provenanceValue = provenance;
    this.versionValue += 1;
    this.updatedAtValue = dependencies.clock.nowIso();

    this.recordDomainEvent(
      new PatientSplit(
        dependencies.identifierGenerator.generate(),
        dependencies.clock.now(),
        {
          originalPatientId: this.patientIdValue.value,
          resultingPatientId: resultingPatientId.value,
          provenance: this.provenanceValue.value,
          version: this.versionValue,
        },
        dependencies.eventMetadata,
      ),
    );
  }

  private ensureExpectedVersion(expectedVersion: number): void {
    if (expectedVersion !== this.versionValue) {
      throw new PatientDomainError(
        'Patient version is stale and must be reloaded before update.',
        'PATIENT_CONCURRENCY_CONFLICT',
      );
    }
  }

  private changedFields(input: PatientUpdateInput): readonly string[] {
    return [
      input.name === undefined ? undefined : 'name',
      input.dateOfBirth === undefined ? undefined : 'dateOfBirth',
      input.gender === undefined ? undefined : 'gender',
      input.phoneNumber === undefined ? undefined : 'phoneNumber',
      input.emailAddress === undefined ? undefined : 'emailAddress',
      input.residentialAddress === undefined ? undefined : 'residentialAddress',
      input.nextOfKin === undefined ? undefined : 'nextOfKin',
    ].filter((field): field is string => field !== undefined);
  }

  private snapshot(): PatientSnapshot {
    return {
      patientId: this.patientIdValue.value,
      enterprisePatientNumber: this.enterprisePatientNumberValue.value,
      hospitalNumber: this.hospitalNumberValue.value,
      name: this.nameValue.displayName,
      dateOfBirth: this.dateOfBirthValue.value,
      gender: this.genderValue.code,
      status: this.statusValue,
      version: this.versionValue,
    };
  }

  private snapshotWithProvenance(): PatientSnapshot & {
    readonly provenance: Readonly<Record<string, string>>;
  } {
    return {
      ...this.snapshot(),
      provenance: this.provenanceValue.value,
    };
  }
}
