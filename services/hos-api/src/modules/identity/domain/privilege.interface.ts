/** Privilege groups permissions under an operational authorization boundary. */
export interface Privilege {
  key: string;
  permissions: string[];
  scope?: string;
}
