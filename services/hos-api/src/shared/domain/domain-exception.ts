import { BaseException } from '../../filters/exceptions';

/** Base exception type for domain-independent enterprise failures. */
export abstract class DomainException extends BaseException {}
