import { Router } from 'express';
import ProjectController from '../controller/project.controller';
import { Routes } from '../interfaces/routes.interfaces';
import { preAuthorize } from '../middleware/auth.middleware';
import { RoleEnum } from '../schema/role/role.model';

class ProjectRoutes implements Routes {
  private readonly BASE_PATH = '/projects';
  private projectController = new ProjectController();
  private _router: Router = Router();

  get router(): Router {
    return this._router;
  }

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this._router.post(
      `${this.BASE_PATH}`,
      preAuthorize([RoleEnum.ADMIN]),
      this.projectController.createProject
    );
    this._router.get(`${this.BASE_PATH}`, this.projectController.getProjects);
    this._router.put(
      `${this.BASE_PATH}/:projectId/user/:userId`,
      preAuthorize([RoleEnum.ADMIN]),
      this.projectController.assignUserToProject
    );
  }
}

export default ProjectRoutes;
