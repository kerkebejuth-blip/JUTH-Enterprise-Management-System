/** Database provider abstraction reserved for Prisma or alternate adapters. */
export interface DatabaseProvider {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  isHealthy(): Promise<boolean>;
}
