import type { ApplicationService } from '../../../../shared/domain';
import type { Patient } from '../../domain';
import type {
  FindPatientQuery,
  GetPatientTimelineQuery,
  SearchPatientsQuery,
} from '../queries';
import type {
  PatientDetailDto,
  PatientSearchResultDto,
  TimelineDto,
} from '../dto';
import {
  PatientNotFoundException,
  PatientApplicationException,
} from '../exceptions';
import { PatientMapper } from '../mappers';
import type {
  PatientRepository,
  PatientSearchPort,
  PatientTimelinePort,
} from '../ports';

/** Finds a complete clinic-neutral Patient identity projection. */
export class FindPatientService implements ApplicationService<
  FindPatientQuery,
  PatientDetailDto
> {
  constructor(private readonly repository: PatientRepository) {}

  /** Reads one Patient aggregate without changing domain state. */
  async execute(query: FindPatientQuery): Promise<PatientDetailDto> {
    const patient = await this.repository.findById(query.patientId);
    if (patient === null) {
      throw new PatientNotFoundException(query.patientId);
    }

    return PatientMapper.toDetail(patient);
  }
}

/** Searches patients through a bounded enterprise search port. */
export class SearchPatientsService implements ApplicationService<
  SearchPatientsQuery,
  PatientSearchResultDto
> {
  constructor(private readonly searchPort: PatientSearchPort) {}

  /** Executes fast, paginated, clinic-neutral identity search. */
  async execute(query: SearchPatientsQuery): Promise<PatientSearchResultDto> {
    if (query.term.trim().length === 0) {
      throw new PatientApplicationException(
        'Patient search requires a non-empty term.',
        'PATIENT_SEARCH_TERM_REQUIRED',
      );
    }

    if (query.page < 1 || query.pageSize < 1 || query.pageSize > 100) {
      throw new PatientApplicationException(
        'Patient search pagination is outside the supported bounds.',
        'PATIENT_SEARCH_PAGINATION_INVALID',
      );
    }

    const result = await this.searchPort.search({
      term: query.term.trim(),
      page: query.page,
      pageSize: query.pageSize,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
    });

    return {
      items: result.items.map((patient) => PatientMapper.toSummary(patient)),
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
    };
  }
}

/** Reads the shared chronological Digital Patient Folder timeline. */
export class GetPatientTimelineService implements ApplicationService<
  GetPatientTimelineQuery,
  TimelineDto
> {
  constructor(
    private readonly repository: PatientRepository,
    private readonly timelinePort: PatientTimelinePort,
  ) {}

  /** Returns a bounded timeline page without specialty-specific knowledge. */
  async execute(query: GetPatientTimelineQuery): Promise<TimelineDto> {
    await this.ensurePatientExists(query.patientId);

    if (query.limit < 1 || query.limit > 100) {
      throw new PatientApplicationException(
        'Patient timeline limit is outside the supported bounds.',
        'PATIENT_TIMELINE_LIMIT_INVALID',
      );
    }

    const result = await this.timelinePort.getTimeline(
      query.patientId,
      query.cursor,
      query.limit,
    );

    return {
      patientId: query.patientId,
      entries: result.entries.map((entry) =>
        PatientMapper.toTimelineEntry(entry),
      ),
      nextCursor: result.nextCursor,
      hasNextPage: result.hasNextPage,
    };
  }

  private async ensurePatientExists(patientId: string): Promise<Patient> {
    const patient = await this.repository.findById(patientId);
    if (patient === null) {
      throw new PatientNotFoundException(patientId);
    }

    return patient;
  }
}
