/** Application operations that affect Patient identity continuity. */
export type PatientApplicationAction =
  'registered' | 'updated' | 'archived' | 'merged' | 'split' | 'restored';

/** Application event contract for future enterprise subscribers. */
export interface PatientApplicationEvent {
  readonly eventId: string;
  readonly eventName: string;
  readonly patientId: string;
  readonly occurredAt: string;
  readonly correlationId?: string;
  readonly causationId?: string;
  readonly userId?: string;
  readonly tenantId?: string;
  readonly facilityId?: string;
}
