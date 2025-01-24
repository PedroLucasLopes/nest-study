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
      for (const line of stackLines) {
        if (line.includes('\\src\\')) {
          location = `src${line.split('src')[1]}`;

          break;
        }
      }
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
