/** Metadata carried by domain events for tracing and future integration. */
export interface DomainEventMetadata {
  readonly correlationId?: string;
  readonly causationId?: string;
  readonly userId?: string;
  readonly tenantId?: string;
  readonly facilityId?: string;
  readonly [key: string]: unknown;
}

/** Framework-independent domain event contract for aggregate notifications. */
export interface IDomainEvent<
  TPayload extends object = Record<string, unknown>,
> {
  readonly eventId: string;
  readonly eventName: string;
  readonly eventVersion: number;
  readonly occurredAt: Date;
  readonly aggregateId?: string;
  readonly payload: Readonly<TPayload>;
  readonly metadata: Readonly<DomainEventMetadata>;
}
