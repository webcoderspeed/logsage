import { LoggerFactory } from './factory/logger.factory';
import { ILogger, ILoggerOptions, LoggerType } from '../types/logger.types';

export class LoggerService implements ILogger {
  private logger: ILogger;

  constructor(
    type: ILoggerOptions['type'] = LoggerType.PINO,
    options?: ILoggerOptions['options']
  ) {
    const loggerFactory = new LoggerFactory();
    this.logger = loggerFactory.getLogger(type, options);
  }

  info(message: string, data?: unknown): void {
    this.logger.info(message, data);
  }
  warn(message: string, data?: unknown): void {
    this.logger.warn(message, data);
  }
  error(message: string, data?: unknown): void {
    this.logger.error(message, data);
  }
  verbose(message: string, data?: unknown): void {
    this.logger.verbose(message, data);
  }
}
