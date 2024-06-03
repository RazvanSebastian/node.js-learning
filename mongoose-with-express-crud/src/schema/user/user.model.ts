import { Types } from 'mongoose';

export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserEmployeeDetails {
  department: string;
  salary: number;
  hireDate: Date;
}

export interface UserPersonalDetails {
  firstName: string;
  lastName: string;
  cnp: string;
  birthDate: Date;
  address: Address;
}

export interface Address {
  street: string;
  city: string;
  zip: number;
}

export interface User {
  _id?: string;
  credentials: UserCredentials;
  employeeDetails: UserEmployeeDetails;
  personalDetails: UserPersonalDetails;
  // Relationships
  role: Types.ObjectId;
  projects: [Types.ObjectId];
}
