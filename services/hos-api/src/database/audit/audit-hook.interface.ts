import type {
  AuditableEntity,
  SoftDeleteEntity,
  TimestampedEntity,
} from '../contracts';

/** Audit hook contract for automatic timestamps and actor placeholders. */
export interface AuditHook<TEntity> {
  beforeCreate(
    entity: TEntity & Partial<TimestampedEntity & AuditableEntity>,
  ): void;
  beforeUpdate(
    entity: TEntity & Partial<TimestampedEntity & AuditableEntity>,
  ): void;
  beforeDelete(entity: TEntity & Partial<SoftDeleteEntity>): void;
}
