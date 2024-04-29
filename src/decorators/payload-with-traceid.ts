import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import speedCache from '../db';
import { TRACE_ID } from '../constants';

export const PayloadWithTraceId = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();

    if (request && typeof request === 'object' && 'traceId' in request) {
      speedCache.set(TRACE_ID, request.traceId);
      return request;
    }

    const traceId = uuidv4();
    speedCache.set(TRACE_ID, traceId);

    return request;
  }
);
