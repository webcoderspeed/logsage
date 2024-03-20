import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { createNamespace, getNamespace } from 'cls-hooked';

const TRACE_ID = 'x-trace-id';
const APP_NAME = 'app-cls';

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
      next();
    });
  }

  static getRequestId(): string {
    const cls = getNamespace(APP_NAME);
    return cls ? cls.get(TRACE_ID) : '';
  }
}
