import type {
  DomainEventMetadata,
  IDomainEvent,
} from './domain-event.interface';

/** Base immutable domain event for future bounded contexts. */
export abstract class DomainEvent<
  TPayload extends object = Record<string, unknown>,
> implements IDomainEvent<TPayload> {
  protected constructor(
    public readonly eventId: string,
    public readonly eventName: string,
    public readonly eventVersion: number,
    public readonly occurredAt: Date,
    public readonly payload: Readonly<TPayload>,
    public readonly metadata: Readonly<DomainEventMetadata> = {},
    public readonly aggregateId?: string,
  ) {}
}
