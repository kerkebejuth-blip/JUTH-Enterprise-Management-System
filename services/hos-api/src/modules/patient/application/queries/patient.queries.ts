import type { SearchDto } from '../dto';

/** Query for one complete patient identity projection. */
export interface FindPatientQuery {
  readonly patientId: string;
}

/** Query for bounded clinic-neutral patient search. */
export type SearchPatientsQuery = SearchDto;

/** Query for the shared chronological Digital Patient Folder timeline. */
export interface GetPatientTimelineQuery {
  readonly patientId: string;
  readonly cursor?: string;
  readonly limit: number;
}
