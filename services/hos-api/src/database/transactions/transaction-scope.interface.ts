/** Transaction scope supporting begin, commit, rollback, and future nesting. */
export interface TransactionScope {
  id: string;
  parentId?: string;
  begin(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}
