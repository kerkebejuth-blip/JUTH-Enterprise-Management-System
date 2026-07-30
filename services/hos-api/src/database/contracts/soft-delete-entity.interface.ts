/** Entity contract for soft deletion and delete actor placeholders. */
export interface SoftDeleteEntity {
  deletedAt?: Date;
  deletedBy?: string;
}
