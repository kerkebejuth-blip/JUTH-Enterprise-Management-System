import { ConflictException } from '../../filters';

/** Exception raised when optimistic locking detects a version conflict. */
export class ConcurrencyConflictException extends ConflictException {
  constructor(
    message = 'Entity version conflict detected.',
    details?: unknown,
  ) {
    super(message, details);
  }
}
