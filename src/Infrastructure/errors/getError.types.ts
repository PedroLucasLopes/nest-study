import {
  BadRequestError,
  CustomError,
  NotFoundError,
  UnauthorizedError,
} from './errors.types';

interface ErrorStatus {
  400?: BadRequestError;
  401?: UnauthorizedError;
  404?: NotFoundError;
}

export class GetError extends CustomError {
  constructor(message: string, status: number) {
    super(message, status);
    status = this.statusCode;
  }

  private errors: ErrorStatus = {
    400: new BadRequestError(this.message),
    401: new UnauthorizedError(this.message),
    404: new NotFoundError(this.message),
  };

  public getError(): CustomError {
    const error = this.errors[this.statusCode] as CustomError;
    error.message = this.message;
    throw error;
  }
}
