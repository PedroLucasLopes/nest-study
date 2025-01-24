import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
@Injectable()
class LoggerRequestMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');
  constructor() { }

  use(request: Request & { auth: unknown }, response: Response, next: NextFunction) {
    const requestStart = Date.now();

    response.on('finish', async () => {
      const { method, originalUrl, headers, ip } = request;
      const { statusCode, statusMessage } = response;

      if (statusCode <= 300) return;
      const host = headers.host ?? 'unknown';
      const clientIp = headers['x-forwarded-for'] ?? ip ?? 'unknown';

      const processingTime = Date.now() - requestStart;

      const message = `${method} ${originalUrl} ${statusCode} ${statusMessage} ${processingTime}ms host: ${host} ip: ${clientIp}`;

      if (statusCode >= 500) {
        return this.logger.error(message);
      }

      if (statusCode >= 400) {
        return this.logger.warn(message);
      }
    });

    next();
  }
}

export default LoggerRequestMiddleware;
