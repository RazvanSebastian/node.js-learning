import { Document, ObjectId, PopulatedDoc, Types } from 'mongoose';
import { Role } from '../role/role.model';

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
  role: Types.ObjectId;
  credentials: UserCredentials;
  employeeDetails: UserEmployeeDetails;
  personalDetails: UserPersonalDetails;
}
