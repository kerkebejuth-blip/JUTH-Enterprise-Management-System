import { Guard } from './guard';

/** Collection helpers for domain-neutral list operations. */
export class Collection {
  /** Returns a readonly array containing each value once. */
  static unique<TValue>(values: readonly TValue[]): readonly TValue[] {
    return [...new Set(values)];
  }

  /** Splits a readonly array into chunks of the requested size. */
  static chunk<TValue>(
    values: readonly TValue[],
    chunkSize: number,
  ): readonly (readonly TValue[])[] {
    Guard.againstNullOrUndefined(chunkSize, 'chunkSize');

    if (chunkSize < 1) {
      throw new Error('chunkSize must be greater than zero.');
    }

    const chunks: TValue[][] = [];
    for (let index = 0; index < values.length; index += chunkSize) {
      chunks.push(values.slice(index, index + chunkSize));
    }

    return chunks;
  }
}
