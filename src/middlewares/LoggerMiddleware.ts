import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { createNamespace, getNamespace } from 'cls-hooked';
import { ILogger } from '../types';

const TRACE_ID = 'x-trace-id';
const APP_NAME = 'app-cls';
const REQUEST = 'request';
const LOGGED_FLAG = 'request-logged';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private clsNamespace = getNamespace(APP_NAME) || createNamespace(APP_NAME);

  use(req: Request, res: Response, next: NextFunction) {
    this.clsNamespace.run(() => {
      const traceId = req.headers[TRACE_ID];
      if (!traceId) {
        req.headers[TRACE_ID] = uuidv4();
      }
      const requestId = req.headers[TRACE_ID];
      this.clsNamespace.set(TRACE_ID, requestId);
      this.clsNamespace.set(REQUEST, req);
      this.clsNamespace.set(LOGGED_FLAG, false); 
      next();
    });
  }

  static getRequestId(): string {
    const cls = getNamespace(APP_NAME);
    return cls ? cls.get(TRACE_ID) : '';
  }

  static logRequest(logger: ILogger) {
    const cls = getNamespace(APP_NAME);
    const request = cls ? cls.get(REQUEST) : null;
    const loggedFlag = cls ? cls.get(LOGGED_FLAG) : false;

    if (request && !loggedFlag) {
      const { method, url, headers, body } = request;

      logger.info('[REQUEST]', {
        method,
        url,
        headers,
        body,
      });

      cls?.set?.(LOGGED_FLAG, true); 
    }
  }
}
