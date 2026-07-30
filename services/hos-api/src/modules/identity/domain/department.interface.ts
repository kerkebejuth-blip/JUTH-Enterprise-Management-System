/** Department scope used by authorization and request context. */
export interface Department {
  id: string;
  code: string;
  name: string;
  facilityId?: string;
}
