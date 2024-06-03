import { Types } from 'mongoose';
import {
  UserCredentials,
  UserEmployeeDetails,
  UserPersonalDetails,
} from '../../schema/user/user.model';
import { Role } from '../../schema/role/role.model';
import { Project } from '../../schema/project/project.model';

export interface UserUpdates {
  department?: string;
  salary?: number;
  role?: Types.ObjectId;
  street?: string;
  city?: string;
  zip?: number;
}

export interface UserDetails {
  _id?: string;
  credentials: UserCredentials;
  employeeDetails: UserEmployeeDetails;
  personalDetails: UserPersonalDetails;
  role: Role;
  projects: Project[];
}

export const mapToMongooseInc = (userUpdates: UserUpdates) => ({
  ...(!!userUpdates?.department && {
    'employeeDetails.department': userUpdates.department,
  }),
  ...(!!userUpdates?.salary && {
    'employeeDetails.salary': userUpdates.salary,
  }),
  ...(!!userUpdates?.role && {
    'employeeDetails.role': userUpdates.role,
  }),
  ...(!!userUpdates?.street && {
    'address.street': userUpdates.street,
  }),
  ...(!!userUpdates?.city && {
    'address.city': userUpdates.city,
  }),
  ...(!!userUpdates?.zip && {
    'address.zip': userUpdates.zip,
  }),
});
