import type {
  FilterExpression,
  SearchExpression,
  SortExpression,
} from '../pagination';

/** Query specification contract for repository filtering and sorting. */
export interface Specification<TEntity> {
  filters?: FilterExpression[];
  search?: SearchExpression;
  sort?: SortExpression[];
  isSatisfiedBy?(entity: TEntity): boolean;
}
