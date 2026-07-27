export interface Patient {
  id: string;

  hospitalNumber: string;

  firstName: string;

  middleName?: string;

  lastName: string;

  gender: "Male" | "Female";

  dateOfBirth: Date;

  phoneNumber?: string;

  email?: string;

  address?: string;

  maritalStatus?: string;

  bloodGroup?: string;

  genotype?: string;

  createdAt: Date;

  updatedAt: Date;
}