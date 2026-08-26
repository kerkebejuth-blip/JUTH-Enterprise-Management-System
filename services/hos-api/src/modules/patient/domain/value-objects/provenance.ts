import { BaseValueObject } from '../../../../shared/domain';
import { normalizeRequiredText } from './value-object.utils';

/** Evidence describing the source and accountability of an identity fact. */
export class Provenance extends BaseValueObject<{
  readonly source: string;
  readonly recordedBy: string;
  readonly recordedAt: string;
  readonly facilityId: string;
  readonly tenantId: string;
  readonly reason: string;
}> {
  /** Creates provenance for a material patient identity operation. */
  static create(properties: {
    readonly source: string;
    readonly recordedBy: string;
    readonly recordedAt: string;
    readonly facilityId: string;
    readonly tenantId: string;
    readonly reason: string;
  }): Provenance {
    return new Provenance({
      source: normalizeRequiredText(properties.source, 'provenance.source'),
      recordedBy: normalizeRequiredText(
        properties.recordedBy,
        'provenance.recordedBy',
      ),
      recordedAt: normalizeRequiredText(
        properties.recordedAt,
        'provenance.recordedAt',
      ),
      facilityId: normalizeRequiredText(
        properties.facilityId,
        'provenance.facilityId',
      ),
      tenantId: normalizeRequiredText(
        properties.tenantId,
        'provenance.tenantId',
      ),
      reason: normalizeRequiredText(properties.reason, 'provenance.reason'),
    });
  }

  /** Returns the immutable provenance payload. */
  get value(): Readonly<{
    readonly source: string;
    readonly recordedBy: string;
    readonly recordedAt: string;
    readonly facilityId: string;
    readonly tenantId: string;
    readonly reason: string;
  }> {
    return this.properties;
  }

  private constructor(properties: {
    readonly source: string;
    readonly recordedBy: string;
    readonly recordedAt: string;
    readonly facilityId: string;
    readonly tenantId: string;
    readonly reason: string;
  }) {
    super(properties);
  }
}
