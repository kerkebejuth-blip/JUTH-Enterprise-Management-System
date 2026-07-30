/** Permission assigned to roles or users for authorization decisions. */
export interface Permission {
  key: string;
  description: string;
  module: string;
  feature?: string;
  action: string;
}
