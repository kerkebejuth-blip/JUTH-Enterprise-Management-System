import type { Session, UserContext } from '../domain';

/** Contract for creating, retrieving, and ending enterprise sessions. */
export interface SessionManager {
  createSession(
    context: UserContext,
    metadata: SessionCreationMetadata,
  ): Promise<Session>;
  getSession(sessionId: string): Promise<Session | null>;
  endSession(sessionId: string, reason: string): Promise<void>;
}

/** Metadata required when opening a session. */
export interface SessionCreationMetadata {
  userAgent?: string;
  ipAddress?: string;
  deviceId?: string;
}
