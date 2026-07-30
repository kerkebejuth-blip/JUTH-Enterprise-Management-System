/** Transaction boundary exposed by future database providers. */
export interface Transaction {
  commit(): Promise<void>;
  rollback(): Promise<void>;
}
