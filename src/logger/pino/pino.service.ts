import { Injectable, LogLevel } from '@nestjs/common';
import pino from 'pino';
import { ILogger, ILoggerOptions } from '../../types/logger.types';
import { format } from 'date-fns';
import formatLogMessage from '../../utils/formatLogMessage';

@Injectable()
export class PinoService implements ILogger {
  private readonly logger: pino.Logger<LogLevel>;

  constructor(loggerOptions: ILoggerOptions['options']) {
    this.logger = pino<LogLevel>({
      transport: {
        target: 'pino-pretty',
      },
      base: {
        pid: false,
      },
      timestamp: () =>
        `,"time":"${format(new Date(),"yyyy-MM-dd'T'HH:mm:ss")}"`,
      ...loggerOptions,
    });
  }

  info(message: string, data?: unknown) {
    const logMessage = formatLogMessage(message, data);
    this.logger.info(logMessage);
    return logMessage;
  }

  warn(message: string, data?: unknown) {
    const logMessage = formatLogMessage(message, data);
    this.logger.warn(logMessage);
    return logMessage;
  }

  error(message: string, data?: unknown) {
    const logMessage = formatLogMessage(message, data);
    this.logger.error(logMessage);
    return logMessage;
  }

  verbose(message: string, data?: unknown) {
    const logMessage = formatLogMessage(message, data);
    this.logger.verbose(logMessage);
    return logMessage;
  }
}
