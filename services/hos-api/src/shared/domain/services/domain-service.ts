/** Marker contract for stateless domain services. */
export interface DomainService {
  readonly serviceName: string;
}

/** Marker contract for use-case orchestration services. */
export interface ApplicationService<TCommand, TResult> {
  execute(command: TCommand): Promise<TResult>;
}

/** Policy contract for domain decision logic. */
export interface DomainPolicy<TInput, TResult = boolean> {
  evaluate(input: TInput): TResult;
}
