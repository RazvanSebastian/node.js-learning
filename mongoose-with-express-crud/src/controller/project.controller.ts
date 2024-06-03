import { NextFunction, Request, Response } from 'express';
import { ProjectService } from '../service/project.service';

class ProjectController {
  private projectService = new ProjectService();

  public createProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const project = await this.projectService.createProject(req.body);
      res.json(project);
    } catch (err) {
      next(err);
    }
  };

  public getProjects = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const projects = await this.projectService.getProjects();
      res.json(projects);
    } catch (err) {
      next(err);
    }
  };

  public assignUserToProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await this.projectService.assignUserToProject(
        req.params.projectId,
        req.params.userId
      );
      res.status(201).send();
    } catch (err) {
      next(err);
    }
  };
}

export default ProjectController;
