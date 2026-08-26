/** Standard successful API response envelope. */
export interface ApiResponse<TData> {
  success: true;
  message: string;
  timestamp: string;
  requestId: string;
  correlationId: string;
  version: string;
  data: TData;
  pagination?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}
