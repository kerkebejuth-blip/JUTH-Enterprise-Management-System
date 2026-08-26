import { BaseValueObject } from '../../../../shared/domain';
import { GenderCode } from '../enums/patient.enums';
import { PatientDomainError } from '../errors/patient-domain.error';
import {
  normalizeOptionalText,
  normalizeRequiredText,
  toUtcDateOnly,
  validateIsoDateOnly,
} from './value-object.utils';
import type { PhoneNumber } from './patient-contact';

interface PatientNameProperties {
  readonly familyName: string;
  readonly givenNames: string;
  readonly otherNames?: string;
  readonly prefix?: string;
  readonly suffix?: string;
  readonly use?: string;
}

/** Administrative patient name preserving entered display components. */
export class PatientName extends BaseValueObject<PatientNameProperties> {
  /** Creates a validated patient name. */
  static create(properties: PatientNameProperties): PatientName {
    return new PatientName({
      familyName: normalizeRequiredText(properties.familyName, 'familyName'),
      givenNames: normalizeRequiredText(properties.givenNames, 'givenNames'),
      otherNames: normalizeOptionalText(properties.otherNames, 'otherNames'),
      prefix: normalizeOptionalText(properties.prefix, 'prefix'),
      suffix: normalizeOptionalText(properties.suffix, 'suffix'),
      use: normalizeOptionalText(properties.use, 'use'),
    });
  }

  /** Returns the family name. */
  get familyName(): string {
    return this.properties.familyName;
  }

  /** Returns the given names. */
  get givenNames(): string {
    return this.properties.givenNames;
  }

  /** Returns optional additional names. */
  get otherNames(): string | undefined {
    return this.properties.otherNames;
  }

  /** Returns the optional name prefix. */
  get prefix(): string | undefined {
    return this.properties.prefix;
  }

  /** Returns the optional name suffix. */
  get suffix(): string | undefined {
    return this.properties.suffix;
  }

  /** Returns the optional name-use designation. */
  get use(): string | undefined {
    return this.properties.use;
  }

  /** Returns a display name without replacing the source components. */
  get displayName(): string {
    return [
      this.properties.familyName,
      this.properties.givenNames,
      this.properties.otherNames,
    ]
      .filter((part): part is string => part !== undefined)
      .join(' ');
  }

  /** Returns a comparison form for matching, not for display. */
  get normalizedForMatching(): string {
    return this.displayName.toLocaleUpperCase('en-NG');
  }

  private constructor(properties: PatientNameProperties) {
    super(properties);
  }
}

interface DateOfBirthProperties {
  readonly value: string;
}

/** Calendar date of birth with explicit future-date protection. */
export class DateOfBirth extends BaseValueObject<DateOfBirthProperties> {
  /** Creates a date of birth using the supplied reference date for validation. */
  static create(value: Date, referenceDate: Date): DateOfBirth {
    const dateOnly = toUtcDateOnly(value, 'dateOfBirth');
    const referenceDateOnly = toUtcDateOnly(referenceDate, 'referenceDate');

    if (dateOnly > referenceDateOnly) {
      throw new PatientDomainError(
        'Date of birth cannot be in the future.',
        'PATIENT_FUTURE_DATE_OF_BIRTH',
      );
    }

    return new DateOfBirth({ value: dateOnly });
  }

  /** Rehydrates a stored date of birth using an explicit reference date. */
  static fromIso(value: string, referenceDate: Date): DateOfBirth {
    const dateOnly = validateIsoDateOnly(value, 'dateOfBirth');
    const referenceDateOnly = toUtcDateOnly(referenceDate, 'referenceDate');

    if (dateOnly > referenceDateOnly) {
      throw new PatientDomainError(
        'Date of birth cannot be in the future.',
        'PATIENT_FUTURE_DATE_OF_BIRTH',
      );
    }

    return new DateOfBirth({ value: dateOnly });
  }

  /** Returns YYYY-MM-DD. */
  get value(): string {
    return this.properties.value;
  }

  private constructor(properties: DateOfBirthProperties) {
    super(properties);
  }
}

interface GenderProperties {
  readonly code: GenderCode;
  readonly display?: string;
}

/** Administrative gender value object using configured domain codes. */
export class Gender extends BaseValueObject<GenderProperties> {
  /** Creates an administrative gender value. */
  static create(code: GenderCode, display?: string): Gender {
    return new Gender({
      code,
      display: normalizeOptionalText(display, 'genderDisplay'),
    });
  }

  /** Returns the domain gender code. */
  get code(): GenderCode {
    return this.properties.code;
  }

  /** Returns an optional local display label. */
  get display(): string | undefined {
    return this.properties.display;
  }

  private constructor(properties: GenderProperties) {
    super(properties);
  }
}

interface ResidentialAddressProperties {
  readonly line1: string;
  readonly line2?: string;
  readonly locality: string;
  readonly region: string;
  readonly country: string;
  readonly postalCode?: string;
}

/** Administrative residential address preserving structured components. */
export class ResidentialAddress extends BaseValueObject<ResidentialAddressProperties> {
  /** Creates a validated residential address. */
  static create(properties: ResidentialAddressProperties): ResidentialAddress {
    return new ResidentialAddress({
      line1: normalizeRequiredText(properties.line1, 'address.line1'),
      line2: normalizeOptionalText(properties.line2, 'address.line2'),
      locality: normalizeRequiredText(properties.locality, 'address.locality'),
      region: normalizeRequiredText(properties.region, 'address.region'),
      country: normalizeRequiredText(properties.country, 'address.country'),
      postalCode: normalizeOptionalText(
        properties.postalCode,
        'address.postalCode',
      ),
    });
  }

  /** Returns the structured address properties. */
  get value(): Readonly<ResidentialAddressProperties> {
    return this.properties;
  }

  private constructor(properties: ResidentialAddressProperties) {
    super(properties);
  }
}

/** Reusable administrative contact relationship for a patient. */
export class NextOfKin extends BaseValueObject<{
  readonly name: string;
  readonly relationship: string;
  readonly phoneNumber?: PhoneNumber;
  readonly address?: ResidentialAddress;
}> {
  /** Creates a next-of-kin value object. */
  static create(properties: {
    readonly name: string;
    readonly relationship: string;
    readonly phoneNumber?: PhoneNumber;
    readonly address?: ResidentialAddress;
  }): NextOfKin {
    return new NextOfKin({
      name: normalizeRequiredText(properties.name, 'nextOfKin.name'),
      relationship: normalizeRequiredText(
        properties.relationship,
        'nextOfKin.relationship',
      ),
      phoneNumber: properties.phoneNumber,
      address: properties.address,
    });
  }

  /** Returns the next-of-kin name. */
  get name(): string {
    return this.properties.name;
  }

  /** Returns the relationship description. */
  get relationship(): string {
    return this.properties.relationship;
  }

  /** Returns the optional phone number. */
  get phoneNumber(): PhoneNumber | undefined {
    return this.properties.phoneNumber;
  }

  /** Returns the optional next-of-kin address. */
  get address(): ResidentialAddress | undefined {
    return this.properties.address;
  }

  private constructor(properties: {
    readonly name: string;
    readonly relationship: string;
    readonly phoneNumber?: PhoneNumber;
    readonly address?: ResidentialAddress;
  }) {
    super(properties);
  }
}
