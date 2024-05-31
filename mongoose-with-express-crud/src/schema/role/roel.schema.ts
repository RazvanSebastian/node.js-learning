import { Schema } from 'mongoose';
import { Role, RoleEnum } from './role.model';
import mongoose from 'mongoose';

const roleSchema = new Schema<Role>({
  name: { type: String, enum: Object.values(RoleEnum), required: true },
});

export const RoleModel = mongoose.model<Role>('Role', roleSchema);
