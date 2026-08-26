/** One normalized validation failure in an enterprise error response. */
export interface ApiValidationError {
  field: string;
  messages: readonly string[];
  code?: string;
}

/** Standard error response envelope emitted by global exception handling. */
export interface ApiError {
  success: false;
  timestamp: string;
  requestId: string;
  correlationId: string;
  statusCode: number;
  errorCode: string;
  message: string;
  details?: unknown;
  validationErrors?: readonly ApiValidationError[];
  path: string;
  method: string;
  version: string;
  type?: string;
  title?: string;
  instance?: string;
}
