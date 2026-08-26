/** Generic mapper contract for transforming between model representations. */
export interface Mapper<TSource, TDestination> {
  toDestination(source: TSource): TDestination;
}

/** DTO mapper contract for external API representation boundaries. */
export interface DtoMapper<TDomain, TDto> {
  toDto(domain: TDomain): TDto;
  toDomain(dto: TDto): TDomain;
}

/** Persistence mapper contract for infrastructure model boundaries. */
export interface PersistenceMapper<TDomain, TPersistence> {
  toPersistence(domain: TDomain): TPersistence;
  toDomain(persistence: TPersistence): TDomain;
}
