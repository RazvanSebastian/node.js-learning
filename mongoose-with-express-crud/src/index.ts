import cookieParser from 'cookie-parser';
import express, { Application } from 'express';
import openDbConnection from './config/db.config';
import { errorHandler } from './middleware/error-handler.middleware';
import { ClientSession } from 'mongoose';
import { doInTransaction } from './core/transactional';
import AppRoutes from './routes';
import { RoleEnum } from './schema/role/role.model';
import { RoleModel } from './schema/role/role.schema';

class MainApp {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeDb();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandler();
  }

  public async start() {
    this.app.listen(3000, () => {
      console.log('Express server listening on port 3000');
    });
  }

  private initializeRoutes() {
    const appRoutes = new AppRoutes(this.app);
    appRoutes.initializeRoutes();
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

const mainApp = new MainApp();
mainApp.start();
