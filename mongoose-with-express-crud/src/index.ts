import cookieParser from 'cookie-parser';
import express, { Application } from 'express';
import openDbConnection from './config/db.config';
import { Routes } from './interfaces/routes.interfaces';
import { errorHandler } from './middleware/error-handler.middleware';
import AuthRoutes from './routes/auth.routes';
import UserRoutes from './routes/user.routes';
import { RoleModel } from './schema/role/roel.schema';
import { RoleEnum } from './schema/role/role.model';
import { doInTransaction } from './core/transactional';
import { ClientSession } from 'mongoose';

const ROUTES = [new UserRoutes(), new AuthRoutes()];

class MainApp {
  public app: Application;

  constructor(routes: Routes[]) {
    this.app = express();
    this.initializeDb();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandler();
  }

  public async start() {
    this.app.listen(3000, () => {
      console.log('Express server listening on port 3000');
    });
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((routes) => this.app.use('/', routes.router));
  }

  private initializeErrorHandler() {
    this.app.use(errorHandler);
  }

  private initializeMiddlewares() {
    this.app.use(cookieParser());
    this.app.use(express.json());
  }

  private async initializeDb() {
    await openDbConnection();
    this.initializeRoles();
  }

  private async initializeRoles() {
    doInTransaction(async (session: ClientSession) => {
      const counts = await RoleModel.countDocuments({}, { session }).exec();
      if (counts === 0) {
        const adminRole = new RoleModel({
          name: RoleEnum.ADMIN,
        });
        const employeeRole = new RoleModel({
          name: RoleEnum.EMPLOYEE,
        });
        await RoleModel.insertMany([adminRole, employeeRole], { session });
      }
    });
  }
}

const mainApp = new MainApp(ROUTES);
mainApp.start();
