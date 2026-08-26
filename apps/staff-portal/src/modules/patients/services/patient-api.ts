import { apiClient } from "../../../app/api";

export interface PatientSummary {
  patientId: string;
  enterprisePatientNumber: string;
  hospitalNumber: string;
  displayName: string;
  dateOfBirth: string;
  gender: string;
  status: string;
  version: number;
}

export interface PatientSearchResponse {
  items: readonly PatientSummary[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

/** Reads the approved Patient identity search contract through the API boundary. */
export function searchPatients(
  term: string,
  page = 1,
  pageSize = 25,
): Promise<PatientSearchResponse> {
  const params = new URLSearchParams({
    search: term,
    page: String(page),
    pageSize: String(pageSize),
    sort: "name",
    direction: "asc",
  });

  return apiClient.get<PatientSearchResponse>(`/api/v1/patients?${params}`);
}
