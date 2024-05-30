export class CustomError extends Error {
  status: number;
  message: string;
  errorCode: ErrorCode;

  constructor(message: string, errorCode: ErrorCode) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
  }
}

export enum ErrorCode {
  BAD_REQUEST = '400 - Bad request',
  INVALID_CREDENTIALS = '401 - Invalid credentials',
  NOT_AUTHORIZED = '403 - Not authorized',
  NOT_FOUND = '404 - Resource not found',
  UNPROCESSABLE = '422 - Persistence error',
  INTERNAL_ERROR = '500 - Internal error',
}
