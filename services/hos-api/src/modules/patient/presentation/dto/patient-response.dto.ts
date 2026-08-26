import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/** Public patient identity projection used in search results. */
export class PatientSummaryResponseDto {
  @ApiProperty({ format: 'uuid' })
  patientId!: string;

  @ApiProperty()
  enterprisePatientNumber!: string;

  @ApiProperty()
  hospitalNumber!: string;

  @ApiProperty()
  displayName!: string;

  @ApiProperty({ format: 'date' })
  dateOfBirth!: string;

  @ApiProperty()
  gender!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  version!: number;
}

/** Public identifier projection retaining assigning-authority provenance. */
export class PatientIdentifierResponseDto {
  @ApiProperty()
  type!: string;

  @ApiProperty()
  value!: string;

  @ApiProperty()
  assigningAuthority!: string;

  @ApiProperty()
  status!: string;
}

/** Public patient identity projection used by the patient detail read. */
export class PatientDetailResponseDto extends PatientSummaryResponseDto {
  @ApiPropertyOptional()
  phoneNumber?: string;

  @ApiPropertyOptional()
  emailAddress?: string;

  @ApiPropertyOptional({ type: Object })
  residentialAddress?: Readonly<Record<string, string>>;

  @ApiPropertyOptional({ type: Object })
  nextOfKin?: Readonly<Record<string, string>>;

  @ApiProperty({ type: [PatientIdentifierResponseDto] })
  identifiers!: readonly PatientIdentifierResponseDto[];

  @ApiProperty({ type: Object })
  provenance!: Readonly<Record<string, string>>;

  @ApiProperty({ format: 'date-time' })
  updatedAt!: string;
}

/** Pagination metadata for the bounded Patient search response. */
export class PatientSearchPaginationResponseDto {
  @ApiProperty({ minimum: 1 })
  page!: number;

  @ApiProperty({ minimum: 1, maximum: 100 })
  pageSize!: number;

  @ApiProperty({ minimum: 0 })
  totalItems!: number;

  @ApiProperty({ minimum: 0 })
  totalPages!: number;
}

/** Public Patient search response data. */
export class PatientSearchResponseDto {
  @ApiProperty({ type: [PatientSummaryResponseDto] })
  items!: readonly PatientSummaryResponseDto[];

  @ApiProperty({ type: PatientSearchPaginationResponseDto })
  pagination!: PatientSearchPaginationResponseDto;
}
