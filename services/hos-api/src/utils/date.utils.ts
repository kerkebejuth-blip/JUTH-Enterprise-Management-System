/** Utility helpers for date and time handling. */
export class DateUtils {
  /** Returns the current timestamp in ISO-8601 format. */
  static nowIso(): string {
    return new Date().toISOString();
  }

  /** Returns service uptime in seconds with millisecond precision. */
  static uptimeSeconds(startedAt: number): number {
    return Number(((Date.now() - startedAt) / 1000).toFixed(3));
  }
}
