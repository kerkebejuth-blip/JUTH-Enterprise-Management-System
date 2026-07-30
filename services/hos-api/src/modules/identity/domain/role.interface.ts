/** Role assigned to users for role-based access control. */
export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: string[];
  privileges: string[];
}
