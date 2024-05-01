import { LoggerFactory } from './factory/logger.factory';
import { ILogger, ILoggerOptions, LoggerType } from '../types/logger.types';
import { LoggerMiddleware } from '../middlewares';
import { TraceIdHandler } from '../utils';

export class LoggerService implements ILogger {
  private logger: ILogger;
  private enableRequestLogging: boolean = false;

  constructor(
    type: ILoggerOptions['type'] = LoggerType.PINO,
    options?: ILoggerOptions['options']
  ) {
    const loggerFactory = new LoggerFactory();
    this.logger = loggerFactory.getLogger(type, options);
    this.enableRequestLogging = options?.enableRequestLogging ?? false;
  }
  private addRequestId(data?: unknown): unknown {
    const TRACE_ID = TraceIdHandler.getTraceIdField();
    const traceId = LoggerMiddleware.getRequestId();

    if (!traceId && !data) {
      return {};
    }

    if (!traceId) {
      return data;
    }

    if (!data) {
      return { [TRACE_ID]: traceId };
    }

    return { ...data, [TRACE_ID]: traceId };
  }

  info(message: string, data?: unknown): void {
    const formattedData = this.addRequestId(data);
    this.logger.info(message, formattedData);
    if (this.enableRequestLogging) {
      LoggerMiddleware.logRequest(this.logger);
    }
  }

  warn(message: string, data?: unknown): void {
    const formattedData = this.addRequestId(data);
    this.logger.warn(message, formattedData);
    if (this.enableRequestLogging) {
      LoggerMiddleware.logRequest(this.logger);
    }
  }

  error(message: string, data?: unknown): void {
    const formattedData = this.addRequestId(data);
    this.logger.error(message, formattedData);
    if (this.enableRequestLogging) {
      LoggerMiddleware.logRequest(this.logger);
    }
  }

  verbose(message: string, data?: unknown): void {
    const formattedData = this.addRequestId(data);
    this.logger.verbose(message, formattedData);
    if (this.enableRequestLogging) {
      LoggerMiddleware.logRequest(this.logger);
    }
  }
}
