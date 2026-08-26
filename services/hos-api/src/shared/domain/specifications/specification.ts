/** Persistence-independent query and rule specification contract. */
export interface Specification<TEntity> {
  isSatisfiedBy(candidate: TEntity): boolean;
  and(other: Specification<TEntity>): Specification<TEntity>;
  or(other: Specification<TEntity>): Specification<TEntity>;
  not(): Specification<TEntity>;
}

/** Base specification with composable boolean operations. */
export abstract class CompositeSpecification<
  TEntity,
> implements Specification<TEntity> {
  abstract isSatisfiedBy(candidate: TEntity): boolean;

  /** Combines this specification with another using logical AND. */
  and(other: Specification<TEntity>): Specification<TEntity> {
    return new AndSpecification(this, other);
  }

  /** Combines this specification with another using logical OR. */
  or(other: Specification<TEntity>): Specification<TEntity> {
    return new OrSpecification(this, other);
  }

  /** Negates this specification. */
  not(): Specification<TEntity> {
    return new NotSpecification(this);
  }
}

/** Specification that always evaluates to true. */
export class AlwaysSatisfiedSpecification<
  TEntity,
> extends CompositeSpecification<TEntity> {
  /** Returns true for every candidate. */
  isSatisfiedBy(): boolean {
    return true;
  }
}

/** Specification composed through logical AND. */
export class AndSpecification<TEntity> extends CompositeSpecification<TEntity> {
  constructor(
    private readonly left: Specification<TEntity>,
    private readonly right: Specification<TEntity>,
  ) {
    super();
  }

  /** Returns true when both inner specifications match. */
  isSatisfiedBy(candidate: TEntity): boolean {
    return (
      this.left.isSatisfiedBy(candidate) && this.right.isSatisfiedBy(candidate)
    );
  }
}

/** Specification composed through logical OR. */
export class OrSpecification<TEntity> extends CompositeSpecification<TEntity> {
  constructor(
    private readonly left: Specification<TEntity>,
    private readonly right: Specification<TEntity>,
  ) {
    super();
  }

  /** Returns true when either inner specification matches. */
  isSatisfiedBy(candidate: TEntity): boolean {
    return (
      this.left.isSatisfiedBy(candidate) || this.right.isSatisfiedBy(candidate)
    );
  }
}

/** Specification composed through logical NOT. */
export class NotSpecification<TEntity> extends CompositeSpecification<TEntity> {
  constructor(private readonly inner: Specification<TEntity>) {
    super();
  }

  /** Returns true when the inner specification does not match. */
  isSatisfiedBy(candidate: TEntity): boolean {
    return !this.inner.isSatisfiedBy(candidate);
  }
}
