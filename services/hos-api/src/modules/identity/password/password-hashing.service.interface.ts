/** Contract for password hashing implementations. */
export interface PasswordHashingService {
  hash(password: string): Promise<string>;
  verify(password: string, hash: string): Promise<boolean>;
}
