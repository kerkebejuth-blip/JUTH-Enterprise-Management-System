import type { EntityId } from '../../database/contracts';

/** Domain-independent base entity for future bounded contexts. */
export abstract class BaseEntity {
  protected constructor(public readonly id: EntityId) {}

  /** Compares entities by stable identity. */
  equals(other: BaseEntity | undefined): boolean {
    if (!other) {
      return false;
    }

    return this.id === other.id;
  }
}
