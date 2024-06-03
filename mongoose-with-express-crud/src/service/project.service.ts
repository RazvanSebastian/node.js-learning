import mongoose, { ClientSession, SchemaTypes, Types } from 'mongoose';
import { doInTransaction } from '../core/transactional';
import { Project } from '../schema/project/project.model';
import { ProjectModel } from '../schema/project/project.schema';
import { UserModel } from '../schema/user/user.schema';

export class ProjectService {
  private ProjectModel = ProjectModel;
  private UserModel = UserModel;

  public async createProject(newProject: Project) {
    return await new this.ProjectModel(newProject).save();
  }

  public async getProjects() {
    return await this.ProjectModel.find().exec();
  }

  public async assignUserToProject(projectId: string, userId: string) {
    doInTransaction(async (session: ClientSession) => {
      await UserModel.findOneAndUpdate(
        { _id: userId },
        {
          $push: { projects: new Types.ObjectId(projectId) },
        },
        {
          session,
        }
      ).exec();
    });
  }
}
