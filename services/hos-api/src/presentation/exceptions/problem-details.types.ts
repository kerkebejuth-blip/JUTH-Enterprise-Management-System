/** RFC 7807-compatible fields carried by enterprise API errors. */
export interface ProblemDetails {
  readonly type: string;
  readonly title: string;
  readonly statusCode: number;
  readonly detail: string;
  readonly instance: string;
  readonly correlationId: string;
  readonly errorCode: string;
  readonly validationErrors?: readonly {
    readonly field: string;
    readonly messages: readonly string[];
  }[];
}
