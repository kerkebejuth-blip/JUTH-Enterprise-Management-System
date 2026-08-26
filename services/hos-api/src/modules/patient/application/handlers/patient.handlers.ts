import type {
  ArchivePatientCommand,
  MergePatientCommand,
  RegisterPatientCommand,
  RestorePatientCommand,
  SplitPatientCommand,
  UpdatePatientCommand,
} from '../commands';
import type {
  PatientDetailDto,
  PatientSearchResultDto,
  TimelineDto,
} from '../dto';
import type {
  FindPatientQuery,
  GetPatientTimelineQuery,
  SearchPatientsQuery,
} from '../queries';
import {
  ArchivePatientService,
  MergePatientService,
  RegisterPatientService,
  RestorePatientService,
  SplitPatientService,
  UpdatePatientService,
} from '../services/patient-command.services';
import {
  FindPatientService,
  GetPatientTimelineService,
  SearchPatientsService,
} from '../services/patient-query.services';

/** Dispatches Patient registration commands to the application service. */
export class RegisterPatientCommandHandler {
  constructor(private readonly service: RegisterPatientService) {}

  /** Executes a registration command. */
  execute(command: RegisterPatientCommand): Promise<PatientDetailDto> {
    return this.service.execute(command);
  }
}

/** Dispatches Patient update commands to the application service. */
export class UpdatePatientCommandHandler {
  constructor(private readonly service: UpdatePatientService) {}

  /** Executes an update command. */
  execute(command: UpdatePatientCommand): Promise<PatientDetailDto> {
    return this.service.execute(command);
  }
}

/** Dispatches Patient archive commands to the application service. */
export class ArchivePatientCommandHandler {
  constructor(private readonly service: ArchivePatientService) {}

  /** Executes an archive command. */
  execute(command: ArchivePatientCommand): Promise<PatientDetailDto> {
    return this.service.execute(command);
  }
}

/** Dispatches Patient merge commands to the application service. */
export class MergePatientCommandHandler {
  constructor(private readonly service: MergePatientService) {}

  /** Executes a merge command. */
  execute(command: MergePatientCommand): Promise<PatientDetailDto> {
    return this.service.execute(command);
  }
}

/** Dispatches Patient split commands to the application service. */
export class SplitPatientCommandHandler {
  constructor(private readonly service: SplitPatientService) {}

  /** Executes a split command. */
  execute(command: SplitPatientCommand): Promise<PatientDetailDto> {
    return this.service.execute(command);
  }
}

/** Dispatches Patient restore commands to the application service. */
export class RestorePatientCommandHandler {
  constructor(private readonly service: RestorePatientService) {}

  /** Executes a restore command. */
  execute(command: RestorePatientCommand): Promise<PatientDetailDto> {
    return this.service.execute(command);
  }
}

/** Dispatches Patient identity queries to the application service. */
export class FindPatientQueryHandler {
  constructor(private readonly service: FindPatientService) {}

  /** Executes a find query. */
  execute(query: FindPatientQuery): Promise<PatientDetailDto> {
    return this.service.execute(query);
  }
}

/** Dispatches Patient search queries to the application service. */
export class SearchPatientsQueryHandler {
  constructor(private readonly service: SearchPatientsService) {}

  /** Executes a search query. */
  execute(query: SearchPatientsQuery): Promise<PatientSearchResultDto> {
    return this.service.execute(query);
  }
}

/** Dispatches Digital Patient Folder timeline queries to the application service. */
export class GetPatientTimelineQueryHandler {
  constructor(private readonly service: GetPatientTimelineService) {}

  /** Executes a timeline query. */
  execute(query: GetPatientTimelineQuery): Promise<TimelineDto> {
    return this.service.execute(query);
  }
}
