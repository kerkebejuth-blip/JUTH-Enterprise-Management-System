export interface ApiEnvelope<TData> {
  success: boolean;
  message: string;
  data: TData;
  requestId?: string;
  correlationId?: string;
  errorCode?: string;
  details?: unknown;
}

interface ApiErrorPayload {
  success?: boolean;
  message?: string;
  errorCode?: string;
  details?: unknown;
  correlationId?: string;
}

/** Error raised by the frontend API boundary with safe troubleshooting context. */
export class ApiClientError extends Error {
  readonly status: number;
  readonly errorCode?: string;
  readonly details?: unknown;
  readonly correlationId?: string;

  constructor(
    message: string,
    status: number,
    payload: ApiErrorPayload = {},
  ) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.errorCode = payload.errorCode;
    this.details = payload.details;
    this.correlationId = payload.correlationId;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function toApiPayload(value: unknown): ApiErrorPayload {
  if (!isRecord(value)) {
    return {};
  }

  return {
    success: typeof value.success === "boolean" ? value.success : undefined,
    message: typeof value.message === "string" ? value.message : undefined,
    errorCode:
      typeof value.errorCode === "string" ? value.errorCode : undefined,
    details: value.details,
    correlationId:
      typeof value.correlationId === "string" ? value.correlationId : undefined,
  };
}

/** Creates the only browser-to-backend transport boundary used by the portal. */
export function createApiClient(baseUrl: string, timeoutMs = 8000) {
  const normalizedBaseUrl = baseUrl.replace(/\/$/, "");

  async function request<TData>(
    path: string,
    init: RequestInit = {},
  ): Promise<TData> {
    const controller = new AbortController();
    const timeout = globalThis.setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(`${normalizedBaseUrl}${path}`, {
        ...init,
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          ...init.headers,
        },
      });
      const body: unknown = await response.json().catch(() => undefined);
      const payload = toApiPayload(body);

      if (!response.ok || payload.success === false) {
        throw new ApiClientError(
          payload.message ?? `Request failed with status ${response.status}.`,
          response.status,
          payload,
        );
      }

      if (!isRecord(body) || !("data" in body)) {
        throw new ApiClientError(
          "The API returned an invalid response envelope.",
          response.status,
          payload,
        );
      }

      return (body as unknown as ApiEnvelope<TData>).data;
    } catch (error) {
      if (error instanceof ApiClientError) {
        throw error;
      }

      if (error instanceof DOMException && error.name === "AbortError") {
        throw new ApiClientError("The API request timed out.", 408);
      }

      throw new ApiClientError(
        "The backend is unavailable. Check the API service and try again.",
        0,
      );
    } finally {
      globalThis.clearTimeout(timeout);
    }
  }

  return {
    get: <TData>(path: string): Promise<TData> => request<TData>(path),
  };
}

export const apiClient = createApiClient(
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000",
);
