import { Application } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import projectRoutes from './project.routes';

export default class AppRoutes {
  private ROUTES = [authRoutes, userRoutes, projectRoutes];
  constructor(private app: Application) {}

  initializeRoutes() {
    this.ROUTES.forEach((routes) => this.app.use('/', routes));
  }
}
