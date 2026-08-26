import type { IDomainEvent } from './events';
import { BaseEntity } from './base-entity';

/** Domain-independent aggregate root base with event collection support. */
export abstract class BaseAggregateRoot extends BaseEntity {
  private readonly events: IDomainEvent[] = [];

  /** Returns a snapshot of uncommitted domain events. */
  get domainEvents(): readonly IDomainEvent[] {
    return [...this.events];
  }

  /** Clears all recorded domain events after publication. */
  clearDomainEvents(): void {
    this.events.splice(0, this.events.length);
  }

  /** Records a domain event for later publication by application services. */
  protected recordDomainEvent(event: IDomainEvent): void {
    this.events.push(event);
  }
}
