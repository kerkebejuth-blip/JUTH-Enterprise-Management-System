/** Session policy settings for concurrency and timeout enforcement. */
export interface SessionPolicy {
  maxConcurrentSessions: number;
  idleTimeoutSeconds: number;
  absoluteTimeoutSeconds: number;
}
