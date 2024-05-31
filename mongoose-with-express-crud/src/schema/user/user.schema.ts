import mongoose, { Document, Error, Schema } from 'mongoose';
import {
  Address,
  Role,
  User,
  UserCredentials,
  UserEmployeeDetails,
  UserPersonalDetails,
} from './user.model';
import {
  BadRequestError,
  UnprocessableContentError,
} from '../../errors/generic.error';
import { ErrorCode } from '../../errors/base.error';
import { NextFunction } from 'express';

const userAddressSchema = new Schema<Address>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: Number },
});

const personalDetailsSchema = new Schema<UserPersonalDetails>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  cnp: { type: String, required: true },
  birthDate: { type: Date, required: true },
  address: userAddressSchema,
});

const employeeDetailsSchema = new Schema<UserEmployeeDetails>({
  department: { type: String, required: true },
  salary: { type: Number, required: true, min: 1 },
  hireDate: { type: Date, required: true },
  role: { type: String, enum: Object.values(Role), required: true },
});

const userCredentialsSchema = new Schema<UserCredentials>({
  username: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
  },
}).pre('save', function (next) {
  if (!this.username || !this.password) {
    return next(
      new BadRequestError(
        'Username and password not valid',
        ErrorCode.BAD_REQUEST
      )
    );
  }
  next();
});

const userSchema = new Schema<User>({
  credentials: userCredentialsSchema,
  employeeDetails: employeeDetailsSchema,
  personalDetails: personalDetailsSchema,
}).post('save', function (error, doc: Document, next: NextFunction) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(
      new UnprocessableContentError(
        'There was a duplicate key error',
        ErrorCode.UNPROCESSABLE
      )
    );
  } else {
    console.log('New user with id %s has been saved', doc._id);
    next();
  }
});

export const UserModel = mongoose.model<User>('User', userSchema);
