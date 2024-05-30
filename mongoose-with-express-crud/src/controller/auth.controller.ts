import express from 'express';
import { AuthService } from '../service/auth.service';

class AuthController {
  private authService = new AuthService();

  public authenticate = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const jwt = await this.authService.authenticate(
        req.body.username,
        req.body.password
      );
      res.setHeader('Set-Cookie', `access_token=${jwt}; HttpOnly`);
      res.end();
    } catch (err) {
      next(err);
    }
  };
}

export default AuthController;
