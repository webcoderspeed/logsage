import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { createNamespace, getNamespace } from 'cls-hooked';
import { ILogger } from '../types';
import { TraceIdHandler } from '../utils';
import { APP_NAME } from '../constants';

const REQUEST = 'request';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private clsNamespace = getNamespace(APP_NAME) || createNamespace(APP_NAME);

  use(req: Request, res: Response, next: NextFunction) {
    const TRACE_ID = TraceIdHandler.getTraceIdField();

    const traceId =
      req.headers[TRACE_ID] ??
      req.body[TRACE_ID] ??
      req.query[TRACE_ID] ??
      uuidv4();

    this.clsNamespace.run(() => {
      req.headers[TRACE_ID] = traceId;
      const requestId = req.headers[TRACE_ID];
      this.clsNamespace.set(TRACE_ID, requestId);
      this.clsNamespace.set(REQUEST, req);
      next();
    });
  }

  static getRequestId(): string {
    const TRACE_ID = TraceIdHandler.getTraceIdField();

    const cls = getNamespace(APP_NAME);
    return cls ? cls.get(TRACE_ID) : '';
  }

  static logRequest(logger: ILogger) {
    const cls = getNamespace(APP_NAME);
    const request = cls ? cls.get(REQUEST) : null;

    if (request) {
      const { method, url, headers, body } = request;

      logger.info('[REQUEST]', {
        method,
        url,
        headers,
        body,
      });
    }
  }
}
