import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomError } from './errors.types';

@Catch(CustomError)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: CustomError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let location: string | null = null;
    let errorDetails: string | null = null;

    const status = exception.getStatus();

    if (exception.stack) {
      const stackLines = exception?.stack?.split('\n');
      const filename = stackLines[2].split('crm');
      location = filename[1];

      const d = exception?.stack?.split('at ');
      const e = d[0].split(filename[1]);
      errorDetails = e[1];
    }

    const errorResponse = {
      statusCode: status,
      message: exception.message,
      res: null,
      error: { url: request.url, location: location, errorDetails },
    };

    response.status(status).json(errorResponse);
  }
}
