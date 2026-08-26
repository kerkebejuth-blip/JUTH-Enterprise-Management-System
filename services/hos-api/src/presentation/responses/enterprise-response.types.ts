/** Reusable pagination metadata returned by enterprise APIs. */
export interface EnterprisePagination {
  readonly page?: number;
  readonly pageSize?: number;
  readonly totalItems?: number;
  readonly totalPages?: number;
  readonly nextCursor?: string;
  readonly hasNextPage?: boolean;
}

/** Framework-independent successful response contract. */
export interface EnterpriseResponse<TData> {
  readonly success: true;
  readonly message: string;
  readonly timestamp: string;
  readonly requestId: string;
  readonly correlationId: string;
  readonly version: string;
  readonly data: TData;
  readonly pagination?: EnterprisePagination;
  readonly metadata?: Readonly<Record<string, unknown>>;
}
