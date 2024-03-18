import { createLogger, transports, format } from 'winston';
import { ILogger, ILoggerOptions } from '../../types/logger.types';
import formatLogMessage from '../../utils/formatLogMessage';

const { combine, timestamp, printf, colorize, align  } = format;

export class WinstonService implements ILogger {
  private readonly logger;

  constructor(loggerOptions: ILoggerOptions['options']) {
    this.logger = createLogger({
      transports: [new transports.Console()],
      format: combine(
        colorize({ all: true }),
        timestamp({
          format: ' YYYY-MM-DDThh:mm:ss ',
        }),
        align(),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
        
      ),
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
