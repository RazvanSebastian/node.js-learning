import { CustomError, ErrorCode } from './base.error';

export class BadRequestError extends CustomError {
  readonly status = 400;
  constructor(message: string, errorCode: ErrorCode) {
    super(message, errorCode);
  }
}

export class AuthenticationError extends CustomError {
  readonly status = 401;
  constructor(message: string, errorCode: ErrorCode) {
    super(message, errorCode);
  }
}

export class AuthorizationError extends CustomError {
  readonly status = 403;
  constructor(message: string, errorCode: ErrorCode) {
    super(message, errorCode);
  }
}

export class NotFoundError extends CustomError {
  readonly status = 404;
  constructor(message: string, errorCode: ErrorCode) {
    super(message, errorCode);
  }
}

export class UnprocessableContent extends CustomError {
  readonly status = 422;
  constructor(message: string, errorCode: ErrorCode) {
    super(message, errorCode);
  }
}
