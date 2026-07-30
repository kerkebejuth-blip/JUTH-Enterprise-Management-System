import type { DomainEvent } from './domain-event.interface';
import type { Entity } from './entity.interface';

/** Aggregate root contract for future domain modules. */
export interface AggregateRoot extends Entity {
  domainEvents: DomainEvent[];
}
