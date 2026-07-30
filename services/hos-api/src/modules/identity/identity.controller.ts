import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { OPENAPI_TAGS } from '../../constants/application.constants';

/** Identity controller reserved for future IAM endpoints. */
@ApiTags(OPENAPI_TAGS.security)
@ApiBearerAuth()
@Controller({ path: 'identity', version: '1' })
export class IdentityController {}
