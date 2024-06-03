import { Router } from 'express';
import UserController from '../controller/user.controller';
import { Routes } from '../interfaces/routes.interfaces';
import { preAuthorize } from '../middleware/auth.middleware';
import { RoleEnum } from '../schema/role/role.model';
import { RequestWithUserAuth } from '../interfaces/auth.interfaces';

class UserRoutes implements Routes {
  private readonly BASE_PATH = '/users';
  private userController = new UserController();
  private _router: Router = Router();

  get router(): Router {
    return this._router;
  }

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this._router.post(this.BASE_PATH, (req, res, next) =>
      this.userController.createUser(req, res, next)
    );
    this._router.get(`${this.BASE_PATH}/me`, preAuthorize(), (req, res, next) =>
      this.userController.getLoggedInUser(req as RequestWithUserAuth, res, next)
    );
    this._router
      .route(`${this.BASE_PATH}/user/:id`)
      .get(preAuthorize([RoleEnum.ADMIN]), (req, res, next) =>
        this.userController.getUser(req as RequestWithUserAuth, res, next)
      )
      .put(preAuthorize(), (req, res, next) =>
        this.userController.updateUser(req as RequestWithUserAuth, res, next)
      )
      .delete(preAuthorize([RoleEnum.ADMIN]), (req, res, next) =>
        this.userController.deleteUser(req as RequestWithUserAuth, res, next)
      );
  }
}

export default new UserRoutes().router;
