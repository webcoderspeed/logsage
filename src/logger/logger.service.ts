import { LoggerFactory } from './factory/logger.factory';
import { ILogger, ILoggerOptions, LoggerType } from '../types/logger.types';
import { LoggerMiddleware } from '../middlewares';

export class LoggerService implements ILogger {
  private logger: ILogger;

  constructor(
    type: ILoggerOptions['type'] = LoggerType.PINO,
    options?: ILoggerOptions['options']
  ) {
    const loggerFactory = new LoggerFactory();
    this.logger = loggerFactory.getLogger(type, options);
  }
  private addRequestId(data?: unknown): unknown {
    const traceId = LoggerMiddleware.getRequestId();

    if (!traceId && !data) {
      return {};
    }

    if (!traceId) {
      return data;
    }

    if (!data) {
      return { traceId };
    }

    return { ...data, traceId };
  }

  info(message: string, data?: unknown): void {
    const formattedData = this.addRequestId(data);
    this.logger.info(message, formattedData);
  }

  warn(message: string, data?: unknown): void {
    const formattedData = this.addRequestId(data);
    this.logger.warn(message, formattedData);
  }

  error(message: string, data?: unknown): void {
    const formattedData = this.addRequestId(data);
    this.logger.error(message, formattedData);
  }

  verbose(message: string, data?: unknown): void {
    const formattedData = this.addRequestId(data);
    this.logger.verbose(message, formattedData);
  }
}
