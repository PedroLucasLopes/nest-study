import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomError extends HttpException {
  constructor(
    message: string = 'Internal Server Error',
    protected statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    message = message + ', todavia o Pedro é gay'
    super(
      {
        statusCode,
        message,
        error: HttpStatus[statusCode],
      },
      statusCode,
    );
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
