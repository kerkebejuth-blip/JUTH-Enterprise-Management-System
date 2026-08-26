/** Context-independent clinical module extension registration contract. */
export interface PatientClinicalModuleExtension {
  readonly moduleId: string;
  readonly displayName: string;
}

/** Registry for future specialty modules that extend the enterprise workspace. */
export class PatientClinicalModuleRegistry {
  private readonly extensions = new Map<
    string,
    PatientClinicalModuleExtension
  >();

  /** Registers one specialty extension by stable module identifier. */
  register(extension: PatientClinicalModuleExtension): void {
    this.extensions.set(extension.moduleId, extension);
  }

  /** Returns the currently registered specialty extensions. */
  list(): readonly PatientClinicalModuleExtension[] {
    return [...this.extensions.values()];
  }
}

/** Supported contribution areas of the Digital Patient Folder. */
export type PatientFolderExtensionKey =
  | 'timeline'
  | 'visits'
  | 'documents'
  | 'orders'
  | 'results'
  | 'medication'
  | 'imaging'
  | 'admissions'
  | 'discharge'
  | 'billing-summary'
  | 'alerts'
  | 'clinical-flags'
  | 'medical-record-status'
  | 'audit'
  | 'attachments';

/** Interface for one bounded contribution to the Digital Patient Folder. */
export interface PatientFolderExtension {
  readonly key: PatientFolderExtensionKey;
  readonly owner: string;
}

/** Registry for folder contributions owned by other bounded contexts. */
export class PatientFolderExtensionRegistry {
  private readonly extensions = new Map<
    PatientFolderExtensionKey,
    PatientFolderExtension
  >();

  /** Registers or replaces a governed folder extension for one contribution key. */
  register(extension: PatientFolderExtension): void {
    this.extensions.set(extension.key, extension);
  }

  /** Returns all active folder extension registrations. */
  list(): readonly PatientFolderExtension[] {
    return [...this.extensions.values()];
  }
}

/** Platform lifecycle hook categories available to Patient composition. */
export type PatientPlatformHookKind =
  | 'metrics'
  | 'tracing'
  | 'correlation'
  | 'performance'
  | 'caching'
  | 'observability'
  | 'feature-flags';

/** Extension contract for platform-level concerns without external services. */
export interface PatientPlatformHook {
  readonly kind: PatientPlatformHookKind;
  readonly name: string;
}

/** Registry for optional metrics, tracing, caching, and observability hooks. */
export class PatientPlatformHookRegistry {
  private readonly hooks = new Map<string, PatientPlatformHook>();

  /** Registers one platform hook by stable name. */
  register(hook: PatientPlatformHook): void {
    this.hooks.set(hook.name, hook);
  }

  /** Returns all registered platform hooks. */
  list(): readonly PatientPlatformHook[] {
    return [...this.hooks.values()];
  }
}

/** Application validation extension contract for future validator integrations. */
export interface PatientValidationExtension {
  readonly name: string;
}

/** Registry for application and future FluentValidation extensions. */
export class PatientValidationExtensionRegistry {
  private readonly extensions = new Map<string, PatientValidationExtension>();

  /** Registers one validation extension by stable name. */
  register(extension: PatientValidationExtension): void {
    this.extensions.set(extension.name, extension);
  }

  /** Returns all registered validation extensions. */
  list(): readonly PatientValidationExtension[] {
    return [...this.extensions.values()];
  }
}

/** Future FHIR boundary for Patient identity exchange. */
export interface PatientFhirIntegrationPort {
  exportPatientReference(patientId: string): Promise<unknown>;
}
