import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/base.error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    res
      .status(err.status)
      .json({
        success: false,
        message: err.message,
        errorCode: err.errorCode,
        status: err.status,
        stack: err.stack,
      })
      .send();
  } else {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      status: 500,
      stack: err.stack,
    });
  }
};
