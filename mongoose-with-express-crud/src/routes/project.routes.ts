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
      (req, res, next) => this.projectController.createProject(req, res, next)
    );
    this._router.get(`${this.BASE_PATH}`, (req, res, next) =>
      this.projectController.getProjects(req, res, next)
    );
    this._router.put(
      `${this.BASE_PATH}/:projectId/user/:userId`,
      preAuthorize([RoleEnum.ADMIN]),
      (req, res, next) =>
        this.projectController.assignUserToProject(req, res, next)
    );
  }
}

export default new ProjectRoutes().router;
