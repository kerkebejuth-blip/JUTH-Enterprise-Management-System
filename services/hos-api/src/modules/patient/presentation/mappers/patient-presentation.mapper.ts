import type {
  PatientDetailDto,
  PatientSearchResultDto,
} from '../../application';
import type {
  PatientDetailResponseDto,
  PatientSearchResponseDto,
  PatientSummaryResponseDto,
} from '../dto';

/** Maps application projections into stable HTTP response projections. */
export class PatientPresentationMapper {
  /** Maps the application Patient detail contract for HTTP transport. */
  static toDetail(input: PatientDetailDto): PatientDetailResponseDto {
    return { ...input };
  }

  /** Maps the application Patient search contract with explicit pagination. */
  static toSearch(input: PatientSearchResultDto): PatientSearchResponseDto {
    const totalPages = Math.ceil(input.total / input.pageSize);
    const items: PatientSummaryResponseDto[] = input.items.map((item) => ({
      ...item,
    }));

    return {
      items,
      pagination: {
        page: input.page,
        pageSize: input.pageSize,
        totalItems: input.total,
        totalPages,
      },
    };
  }
}
