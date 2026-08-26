import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsString, MinLength } from 'class-validator';

import { EnterpriseQueryDto } from '../../../../presentation/requests';

const patientSortFields = ['name', 'hospitalNumber', 'updatedAt'] as const;

/** Validated query contract for bounded Patient identity search. */
export class PatientSearchQueryDto extends EnterpriseQueryDto {
  @ApiProperty({ minLength: 2, example: '08012345678' })
  @IsString()
  @MinLength(2)
  declare search: string;

  @ApiPropertyOptional({ enum: patientSortFields, example: 'name' })
  @IsIn(patientSortFields)
  declare sort?: (typeof patientSortFields)[number];
}
