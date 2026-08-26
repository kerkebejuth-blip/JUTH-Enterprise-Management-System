import {
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import {
  ApiEnterpriseBearerAuth,
  ApiEnterpriseOperation,
  ApiEnterpriseQuery,
} from '../../../../presentation';
import { Permissions } from '../../../../security';
import { OPENAPI_TAGS } from '../../../../constants/application.constants';
import {
  FindPatientQueryHandler,
  SearchPatientsQueryHandler,
} from '../../application';
import { PatientApplicationException } from '../../application/exceptions';
import { PatientPresentationMapper } from '../mappers';
import {
  PatientDetailResponseDto,
  PatientSearchQueryDto,
  PatientSearchResponseDto,
} from '../dto';
import {
  BusinessException,
  NotFoundException,
  ValidationException,
} from '../../../../filters';

/** Versioned, authorization-protected Patient identity read endpoints. */
@ApiTags(OPENAPI_TAGS.patient)
@ApiBearerAuth()
@ApiExtraModels(PatientDetailResponseDto, PatientSearchResponseDto)
@Controller({ path: 'patients', version: '1' })
export class PatientController {
  constructor(
    @Inject(FindPatientQueryHandler)
    private readonly findPatient: FindPatientQueryHandler,
    @Inject(SearchPatientsQueryHandler)
    private readonly searchPatients: SearchPatientsQueryHandler,
  ) {}

  /** Returns one clinic-neutral Patient identity projection by UUID. */
  @Get(':patientId')
  @Permissions('PATIENT_READ')
  @ApiEnterpriseBearerAuth()
  @ApiEnterpriseOperation('Get patient identity by UUID', 'getPatientById')
  @ApiParam({ name: 'patientId', format: 'uuid' })
  async getPatient(
    @Param('patientId', new ParseUUIDPipe()) patientId: string,
  ): Promise<PatientDetailResponseDto> {
    try {
      const result = await this.findPatient.execute({ patientId });
      return PatientPresentationMapper.toDetail(result);
    } catch (error: unknown) {
      rethrowPatientApplicationError(error);
    }
  }

  /** Returns bounded minimum-disclosure Patient identity search results. */
  @Get()
  @Permissions('PATIENT_READ')
  @ApiEnterpriseBearerAuth()
  @ApiEnterpriseOperation('Search patient identities', 'searchPatients')
  @ApiEnterpriseQuery()
  async search(
    @Query() query: PatientSearchQueryDto,
  ): Promise<PatientSearchResponseDto> {
    try {
      const result = await this.searchPatients.execute({
        term: query.search,
        page: query.page,
        pageSize: query.pageSize,
        sortBy: query.sort,
        sortOrder: query.direction,
      });
      return PatientPresentationMapper.toSearch(result);
    } catch (error: unknown) {
      rethrowPatientApplicationError(error);
    }
  }
}

function rethrowPatientApplicationError(error: unknown): never {
  if (!(error instanceof PatientApplicationException)) {
    throw error;
  }

  switch (error.code) {
    case 'PATIENT_NOT_FOUND':
      throw new NotFoundException(error.message, error.details);
    case 'PATIENT_SEARCH_TERM_REQUIRED':
    case 'PATIENT_SEARCH_PAGINATION_INVALID':
      throw new ValidationException(error.message, error.details);
    default:
      throw new BusinessException(error.message, error.details);
  }
}
