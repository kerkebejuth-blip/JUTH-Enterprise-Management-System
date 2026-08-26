import { BaseValueObject } from '../../../../shared/domain';
import { PatientDomainError } from '../errors/patient-domain.error';
import { normalizeRequiredText } from './value-object.utils';

interface PhoneNumberProperties {
  readonly value: string;
}

/** Normalized phone contact value object. */
export class PhoneNumber extends BaseValueObject<PhoneNumberProperties> {
  /** Creates a phone number while retaining a normalized dialable form. */
  static create(value: string): PhoneNumber {
    const normalized = normalizeRequiredText(value, 'phoneNumber').replace(
      /[()\-.]/g,
      '',
    );

    if (!/^\+?[0-9 ]{7,20}$/.test(normalized)) {
      throw new PatientDomainError(
        'Phone number must contain a valid dialable number.',
        'PATIENT_INVALID_PHONE',
      );
    }

    return new PhoneNumber({ value: normalized.replace(/ /g, '') });
  }

  /** Returns the normalized dialable phone number. */
  get value(): string {
    return this.properties.value;
  }

  private constructor(properties: PhoneNumberProperties) {
    super(properties);
  }
}

interface EmailAddressProperties {
  readonly value: string;
}

/** Normalized email contact value object. */
export class EmailAddress extends BaseValueObject<EmailAddressProperties> {
  /** Creates a validated email address. */
  static create(value: string): EmailAddress {
    const normalized = normalizeRequiredText(
      value,
      'emailAddress',
    ).toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      throw new PatientDomainError(
        'Email address must use a valid email format.',
        'PATIENT_INVALID_EMAIL',
      );
    }

    return new EmailAddress({ value: normalized });
  }

  /** Returns the normalized email address. */
  get value(): string {
    return this.properties.value;
  }

  private constructor(properties: EmailAddressProperties) {
    super(properties);
  }
}
