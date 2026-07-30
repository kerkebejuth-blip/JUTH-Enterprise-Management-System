/** Domain event contract emitted by aggregate roots. */
export interface DomainEvent {
  eventId: string;
  eventType: string;
  occurredAt: string;
  aggregateId?: string;
  payload: Record<string, unknown>;
}
