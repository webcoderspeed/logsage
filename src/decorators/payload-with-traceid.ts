import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import speedCache from '../db';
import { TraceIdHandler } from '../utils';

export const PayloadWithTraceId = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const TRACE_ID = TraceIdHandler.getTraceIdField();
    const request = ctx.switchToHttp().getRequest();

    if (request && typeof request === 'object' && TRACE_ID in request) {
      speedCache.set(TRACE_ID, request[TRACE_ID]);
      return request;
    }

    const traceId = uuidv4();
    speedCache.set(TRACE_ID, traceId);

    return request;
  },
);
