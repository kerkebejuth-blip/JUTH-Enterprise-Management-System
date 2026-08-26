/** Optional localization extension for presentation validation messages. */
export interface ValidationLocalizationHook {
  localize(messages: readonly string[], locale?: string): readonly string[];
}

/** Framework-neutral validation error shape for future adapters. */
export interface PresentationValidationError {
  readonly field: string;
  readonly messages: readonly string[];
  readonly code?: string;
}
