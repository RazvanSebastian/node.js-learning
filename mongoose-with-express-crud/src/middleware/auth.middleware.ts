import { NextFunction, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { JWT, SECRET_KEY } from '../config/security.config';
import { ErrorCode } from '../errors/base.error';
import {
  AuthenticationError,
  AuthorizationError,
} from '../errors/generic.error';
import { RequestWithUserAuth } from '../interfaces/auth.interfaces';
import { Role } from '../schema/role/role.model';
import { UserModel } from '../schema/user/user.schema';

export const preAuthorize = (allowedRoles: string[] = []) => {
  return async (
    req: RequestWithUserAuth,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const jwt = req.cookies['access_token'];
      if (jwt === undefined) {
        next(
          new AuthenticationError(
            'JWT not present in cookies',
            ErrorCode.INVALID_CREDENTIALS
          )
        );
        return;
      }
      const jwtPayload = JWT.verify(jwt, SECRET_KEY) as JwtPayload;
      const user = await findUser(jwtPayload.sub);
      if (user === null) {
        next(
          new AuthenticationError(
            'User not found',
            ErrorCode.INVALID_CREDENTIALS
          )
        );
        return;
      }
      if (allowedRoles.length > 0 && !allowedRoles.includes(user.role.name)) {
        next(
          new AuthorizationError(
            "Don't have enough rights",
            ErrorCode.NOT_AUTHORIZED
          )
        );
        return;
      }
      req.user = {
        id: user.id,
        username: user.credentials.username,
        role: user.role.name,
      };
      next();
    } catch (error) {
      next(
        new AuthenticationError('Invalid JWT', ErrorCode.INVALID_CREDENTIALS)
      );
    }
  };
};

const findUser = async (id: string) => {
  let user = await UserModel.findById(id);
  return await user.populate<{ role: Role }>('role');
};
