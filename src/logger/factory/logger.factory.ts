import { PinoService } from '../pino/pino.service';
import { ILogger, ILoggerOptions, LoggerType } from '../../types/logger.types';
import { WinstonService } from '../winston/winston.service';

export class LoggerFactory {
  getLogger(
    loggerType: LoggerType,
    options: ILoggerOptions['options']
  ): ILogger {
    switch (loggerType) {
      case LoggerType.PINO:
        return new PinoService(options);
      case LoggerType.WINSTON:
        return new WinstonService(options);
      default:
        throw new Error(`Unsupported logger type: ${loggerType}`);
    }
  }
}
