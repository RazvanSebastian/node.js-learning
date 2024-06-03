import { Router } from 'express';
import AuthController from '../controller/auth.controller';
import { Routes } from '../interfaces/routes.interfaces';

class AuthRoutes implements Routes {
  private readonly BASE_PATH = '/auth';
  private authController = new AuthController();
  private _router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  get router(): Router {
    return this._router;
  }

  private initializeRoutes() {
    this._router.post(`${this.BASE_PATH}/login`, (req, res, next) =>
      this.authController.authenticate(req, res, next)
    );
  }
}

export default new AuthRoutes().router;
