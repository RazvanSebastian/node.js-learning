import mongoose, { Schema } from 'mongoose';
import { Role, UserEntity } from './user.model';

const userSchema = new Schema<UserEntity>({
  credentials: {
    username: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
  },
  employeeDetails: {
    department: { type: String, required: true },
    salary: { type: Number, required: true, min: 1 },
    hireDate: { type: Date, required: true },
    role: { type: String, enum: Object.values(Role), required: true },
  },
  personalDetails: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    cnp: { type: String, required: true },
    birthDate: { type: Date, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      zip: { type: Number },
    },
  },
});

export const UserModel = mongoose.model<UserEntity>('User', userSchema);
