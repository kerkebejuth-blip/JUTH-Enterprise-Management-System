import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ApiErrorResponseDto, ApiResponseEnvelopeDto } from '../../dto';

/** Documents a versioned enterprise operation and its standard envelopes. */
export function ApiEnterpriseOperation(
  summary: string,
  operationId: string,
): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary, operationId }),
    ApiExtraModels(ApiResponseEnvelopeDto, ApiErrorResponseDto),
    ApiOkResponse({ type: ApiResponseEnvelopeDto }),
    ApiBadRequestResponse({ type: ApiErrorResponseDto }),
    ApiUnauthorizedResponse({ type: ApiErrorResponseDto }),
    ApiForbiddenResponse({ type: ApiErrorResponseDto }),
  );
}

/** Documents the standard enterprise pagination/filter/search query contract. */
export function ApiEnterpriseQuery(): MethodDecorator {
  return applyDecorators(
    ApiQuery({ name: 'page', required: false, type: Number, example: 1 }),
    ApiQuery({
      name: 'pageSize',
      required: false,
      type: Number,
      example: 25,
    }),
    ApiQuery({ name: 'sort', required: false, type: String }),
    ApiQuery({
      name: 'direction',
      required: false,
      enum: ['asc', 'desc'],
    }),
    ApiQuery({ name: 'filter', required: false, type: String }),
    ApiQuery({ name: 'search', required: false, type: String }),
    ApiQuery({ name: 'cursor', required: false, type: String }),
  );
}

/** Documents a route that requires the future enterprise bearer policy. */
export function ApiEnterpriseBearerAuth(): MethodDecorator {
  return ApiBearerAuth('Bearer');
}
