import express from 'express';
import UserService from '../service/user.service';
import { RequestWithUserAuth } from '../interfaces/auth.interfaces';

class UserController {
  private userService = new UserService();

  public createUser = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const user = await this.userService.createUser(req.body);
      res.json(user);
    } catch (err) {
      next(err);
    }
  };

  public getUser = async (
    req: RequestWithUserAuth,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const user = await this.userService.getUser(req.params.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  };

  public updateUser = async (
    req: RequestWithUserAuth,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const updatedUser = await this.userService.updateUser(
        req.params.id,
        req.body
      );
      res.json(updatedUser);
    } catch (err) {
      next(err);
    }
  };

  public deleteUser = async (
    req: RequestWithUserAuth,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await this.userService.deleteUser(req.params.id);
      res.status(201);
      res.send();
    } catch (err) {
      next(err);
    }
  };

  public getLoggedInUser = async (
    req: RequestWithUserAuth,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const user = await this.userService.getUser(req.user.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  };
}

export default UserController;
