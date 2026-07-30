/** Standard successful API response envelope. */
export interface ApiResponse<TData> {
  success: true;
  message: string;
  timestamp: string;
  requestId: string;
  version: string;
  data: TData;
  metadata: Record<string, unknown>;
}
