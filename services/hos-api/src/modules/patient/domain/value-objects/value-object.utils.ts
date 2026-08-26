import { PatientDomainError } from '../errors/patient-domain.error';

/** Normalizes a required human-entered text value without losing its meaning. */
export function normalizeRequiredText(value: string, field: string): string {
  const normalized = value.trim().replace(/\s+/g, ' ');

  if (normalized.length === 0) {
    throw new PatientDomainError(
      `${field} is required.`,
      'PATIENT_REQUIRED_FIELD',
      {
        field,
      },
    );
  }

  if ([...normalized].some((character) => '[]{}<>'.includes(character))) {
    throw new PatientDomainError(
      `${field} contains invalid characters.`,
      'PATIENT_INVALID_FIELD',
      {
        field,
      },
    );
  }

  return normalized;
}

/** Normalizes an optional human-entered text value. */
export function normalizeOptionalText(
  value: string | undefined,
  field: string,
): string | undefined {
  return value === undefined ? undefined : normalizeRequiredText(value, field);
}

/** Validates a Date input and returns its UTC calendar date. */
export function toUtcDateOnly(value: Date, field: string): string {
  if (Number.isNaN(value.getTime())) {
    throw new PatientDomainError(
      `${field} must be a valid date.`,
      'PATIENT_INVALID_DATE',
      {
        field,
      },
    );
  }

  const year = value.getUTCFullYear().toString().padStart(4, '0');
  const month = (value.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = value.getUTCDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/** Validates a stored ISO date and returns its calendar component. */
export function validateIsoDateOnly(value: string, field: string): string {
  const normalized = value.trim();

  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    throw new PatientDomainError(
      `${field} must use YYYY-MM-DD format.`,
      'PATIENT_INVALID_DATE',
      {
        field,
      },
    );
  }

  const [year, month, day] = normalized.split('-').map(Number);
  const candidate = new Date(Date.UTC(year, month - 1, day));

  if (
    candidate.getUTCFullYear() !== year ||
    candidate.getUTCMonth() !== month - 1 ||
    candidate.getUTCDate() !== day
  ) {
    throw new PatientDomainError(
      `${field} must be a real calendar date.`,
      'PATIENT_INVALID_DATE',
      {
        field,
      },
    );
  }

  return normalized;
}
