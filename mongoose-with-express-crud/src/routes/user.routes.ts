import { Router } from 'express';
import UserController from '../controller/user.controller';
import { Routes } from '../interfaces/routes.interfaces';
import { preAuthorize } from '../middleware/auth.middleware';
import { RoleEnum } from '../schema/role/role.model';

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
    this._router.post(this.BASE_PATH, this.userController.createUser);
    this._router.get(
      `${this.BASE_PATH}/me`,
      preAuthorize(),
      this.userController.getLoggedInUser
    );
    this._router
      .route(`${this.BASE_PATH}/user/:id`)
      .get(preAuthorize([RoleEnum.ADMIN]), this.userController.getUser)
      .put(preAuthorize(), this.userController.updateUser)
      .delete(preAuthorize([RoleEnum.ADMIN]), this.userController.deleteUser);
  }
}

export default UserRoutes;
