import { Types } from 'mongoose';

export interface UserUpdates {
  department?: string;
  salary?: number;
  role?: Types.ObjectId;
  street?: string;
  city?: string;
  zip?: number;
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
