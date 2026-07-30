import type { EntityId } from './entity-id.type';

/** Base entity contract for persistence-aware domain objects. */
export interface Entity {
  id: EntityId;
}
