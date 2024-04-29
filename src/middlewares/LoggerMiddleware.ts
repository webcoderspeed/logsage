import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ILogger } from '../types';
import speedCache from '../db';
import { TRACE_ID } from '../constants';

const REQUEST = 'request';
const LOGGED_FLAG = 'request-logged';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const traceId = req.headers[TRACE_ID];
    if (!traceId) {
      req.headers[TRACE_ID] = uuidv4();
    }
    const requestId = req.headers[TRACE_ID];
    speedCache.set(TRACE_ID, requestId);
    speedCache.set(REQUEST, req);
    speedCache.set(LOGGED_FLAG, false);
    next();
  }

  static getRequestId(): string {
    return speedCache.get(TRACE_ID) ? String(speedCache.get(TRACE_ID)) : '';
  }

  static logRequest(logger: ILogger) {
    const request = speedCache.get(REQUEST) ? speedCache.get(REQUEST) : null;
    const loggedFlag = speedCache.get(LOGGED_FLAG) ? speedCache.get(LOGGED_FLAG) : false;

    if (request && !loggedFlag) {
      const { method, url, headers, body } = request as Request;

      logger.info('[REQUEST]', {
        method,
        url,
        headers,
        body,
      });

      speedCache?.set?.(LOGGED_FLAG, true);
    }
  }
}
