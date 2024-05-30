import { Request } from 'express';

export interface RequestWithUserAuth extends Request {
  user: AuthenticatedUser;
}

export interface AuthenticatedUser {
  id: string;
  username: string;
  role: string;
}
