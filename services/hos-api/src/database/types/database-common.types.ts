/** UUID database type alias. */
export type UUID = string;

/** ULID database type placeholder. */
export type ULID = string;

/** JSON database value contract. */
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

/** DateTime database type alias. */
export type DateTime = Date;

/** Money value placeholder for future financial modules. */
export interface Money {
  amount: string;
  currency: string;
}

/** Quantity value placeholder for future inventory and clinical modules. */
export interface Quantity {
  value: string;
  unit: string;
}

/** Code table placeholder contract for reference data. */
export interface CodeTableEntry {
  code: string;
  display: string;
  system?: string;
}
