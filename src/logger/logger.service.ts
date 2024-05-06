import { LoggerFactory } from './factory/logger.factory';
import { ILogger, ILoggerOptions, LoggerType } from '../types/logger.types';
import { LoggerMiddleware } from '../middlewares';
import { TraceIdHandler } from '../utils';

export class LoggerService implements ILogger {
  private logger: ILogger;
  private enableRequestLogging: boolean;

  constructor({
    type = LoggerType.PINO,
    options,
  }: Partial<ILoggerOptions> = {}) {
    const loggerFactory = new LoggerFactory();
    this.logger = loggerFactory.getLogger(type, options);
    this.enableRequestLogging = options?.enableRequestLogging ?? false;
  }

  private addRequestId(
    data?: Record<string, unknown>,
  ): Record<string, unknown> {
    const TRACE_ID = TraceIdHandler.getTraceIdField();
    const traceId = LoggerMiddleware.getRequestId();

    if (!traceId) return data ?? {};

    return { ...data, [TRACE_ID]: traceId };
  }

  private logWithRequestId(
    level: keyof ILogger,
    message: string,
    data?: Record<string, unknown>,
  ): void {
    const formattedData = this.addRequestId(data);
    this.logger[level](message, formattedData);
    if (this.enableRequestLogging) LoggerMiddleware.logRequest(this.logger);
  }

  info(message: string, data?: Record<string, unknown>): void {
    this.logWithRequestId('info', message, data);
  }

  warn(message: string, data?: Record<string, unknown>): void {
    this.logWithRequestId('warn', message, data);
  }

  error(message: string, data?: Record<string, unknown>): void {
    this.logWithRequestId('error', message, data);
  }

  verbose(message: string, data?: Record<string, unknown>): void {
    this.logWithRequestId('verbose', message, data);
  }
}
