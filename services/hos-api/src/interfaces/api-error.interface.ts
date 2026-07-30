/** Standard error response envelope emitted by global exception handling. */
export interface ApiError {
  success: false;
  timestamp: string;
  requestId: string;
  statusCode: number;
  errorCode: string;
  message: string;
  details?: unknown;
  path: string;
  method: string;
  version: string;
}
