/** Contract for module-based database seed contributors. */
export interface SeedContributor {
  readonly name: string;
  run(): Promise<void>;
}
