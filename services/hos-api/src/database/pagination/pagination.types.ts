/** Sort direction for database queries. */
export type SortOrder = 'asc' | 'desc';

/** Offset pagination request contract. */
export interface PageRequest {
  page: number;
  pageSize: number;
}

/** Cursor pagination request contract. */
export interface CursorPageRequest {
  cursor?: string;
  limit: number;
}

/** Sort expression for database queries. */
export interface SortExpression {
  field: string;
  order: SortOrder;
}

/** Filter expression for database queries. */
export interface FilterExpression {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'in';
  value: unknown;
}

/** Search expression for full-text or provider-specific search. */
export interface SearchExpression {
  term: string;
  fields: string[];
}

/** Paginated result contract. */
export interface PageResult<TItem> {
  items: TItem[];
  total: number;
  page: number;
  pageSize: number;
}

/** Cursor-paginated result contract. */
export interface CursorPageResult<TItem> {
  items: TItem[];
  nextCursor?: string;
  hasNextPage: boolean;
}
