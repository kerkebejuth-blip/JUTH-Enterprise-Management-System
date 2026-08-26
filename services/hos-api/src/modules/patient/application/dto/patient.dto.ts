import type {
  GenderCode,
  IdentifierStatus,
  PatientIdentifierType,
  PatientStatus,
} from '../../domain';

/** Structured patient name input accepted by the application boundary. */
export interface PatientNameDto {
  readonly familyName: string;
  readonly givenNames: string;
  readonly otherNames?: string;
  readonly prefix?: string;
  readonly suffix?: string;
  readonly use?: string;
}

/** Patient identifier input with assigning-authority provenance. */
export interface PatientIdentifierDto {
  readonly type: PatientIdentifierType;
  readonly value: string;
  readonly assigningAuthority: string;
  readonly status: IdentifierStatus;
  readonly facilityId?: string;
}

/** Provenance required for a material patient identity operation. */
export interface PatientProvenanceDto {
  readonly source: string;
  readonly recordedBy: string;
  readonly recordedAt: string;
  readonly facilityId: string;
  readonly tenantId: string;
  readonly reason: string;
}

/** Optional administrative contact data for a patient. */
export interface PatientContactDto {
  readonly phoneNumber?: string;
  readonly emailAddress?: string;
  readonly residentialAddress?: {
    readonly line1: string;
    readonly line2?: string;
    readonly locality: string;
    readonly region: string;
    readonly country: string;
    readonly postalCode?: string;
  };
  readonly nextOfKin?: {
    readonly name: string;
    readonly relationship: string;
    readonly phoneNumber?: string;
    readonly address?: PatientContactDto['residentialAddress'];
  };
}

/** Registration data required to establish a lifelong patient identity. */
export interface RegistrationDto extends PatientContactDto {
  readonly enterprisePatientNumber: string;
  readonly hospitalNumber: string;
  readonly name: PatientNameDto;
  readonly dateOfBirth: string;
  readonly gender: GenderCode;
  readonly identifiers?: readonly PatientIdentifierDto[];
  readonly status: PatientStatus;
  readonly provenance: PatientProvenanceDto;
}

/** Approved demographic changes for an existing patient identity. */
export interface UpdateDto extends PatientContactDto {
  readonly name?: PatientNameDto;
  readonly dateOfBirth?: string;
  readonly gender?: GenderCode;
  readonly provenance: PatientProvenanceDto;
}

/** Bounded, clinic-neutral patient search input. */
export interface SearchDto {
  readonly term: string;
  readonly page: number;
  readonly pageSize: number;
  readonly sortBy?: 'name' | 'hospitalNumber' | 'updatedAt';
  readonly sortOrder?: 'asc' | 'desc';
}

/** Compact patient representation for lists and search results. */
export interface PatientSummaryDto {
  readonly patientId: string;
  readonly enterprisePatientNumber: string;
  readonly hospitalNumber: string;
  readonly displayName: string;
  readonly dateOfBirth: string;
  readonly gender: GenderCode;
  readonly status: PatientStatus;
  readonly version: number;
}

/** Complete identity representation for application-layer reads. */
export interface PatientDetailDto extends PatientSummaryDto {
  readonly phoneNumber?: string;
  readonly emailAddress?: string;
  readonly residentialAddress?: Readonly<Record<string, string>>;
  readonly nextOfKin?: Readonly<Record<string, string>>;
  readonly identifiers: readonly PatientIdentifierDto[];
  readonly provenance: Readonly<Record<string, string>>;
  readonly updatedAt: string;
}

/** One chronological entry projected into the Digital Patient Folder. */
export interface TimelineEntryDto {
  readonly entryId: string;
  readonly category: string;
  readonly occurredAt: string;
  readonly title: string;
  readonly summary: string;
  readonly source: string;
}

/** Patient timeline response contract independent of clinical specialties. */
export interface TimelineDto {
  readonly patientId: string;
  readonly entries: readonly TimelineEntryDto[];
  readonly nextCursor?: string;
  readonly hasNextPage: boolean;
}

/** Search response with bounded result metadata. */
export interface PatientSearchResultDto {
  readonly items: readonly PatientSummaryDto[];
  readonly total: number;
  readonly page: number;
  readonly pageSize: number;
}
