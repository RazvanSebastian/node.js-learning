import mongoose, { Schema } from 'mongoose';
import { Project } from './project.model';
import { NextFunction } from 'express';
import { BadRequestError } from '../../errors/generic.error';
import { ErrorCode } from '../../errors/base.error';

const projectSchema = new Schema<Project>({
  name: { type: String, required: true, unique: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: false },
  tools: { type: [String], required: false },
}).pre('validate', function (next: NextFunction) {
  if (
    !this.endDate ||
    (this.endDate && this.endDate.getTime() > this.startDate.getTime())
  ) {
    next();
  } else {
    next(
      new BadRequestError(
        'End date should be after start date',
        ErrorCode.BAD_REQUEST
      )
    );
  }
});

export const ProjectModel = mongoose.model<Project>('Project', projectSchema);
