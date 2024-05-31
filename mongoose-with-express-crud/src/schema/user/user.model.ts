export enum Role {
  ADMIN = 'admin',
  MANAGER = 'manager',
  EMPLOYEE = 'employee',
}

export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserEmployeeDetails {
  department: string;
  salary: number;
  hireDate: Date;
  role: Role;
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
}
