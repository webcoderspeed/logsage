import { LogLevel } from '@nestjs/common'
import { DestinationStream, LoggerOptions as PinoLoggerOptions } from 'pino'
import { LoggerOptions as WinstonLoggerOptions, LogMethod} from 'winston'

export interface ILogger {
  info(message: string, data?: unknown): void;
  warn(message: string, data?: unknown): void;
  error(message: string, data?: unknown): void;
  verbose(message: string, data?: unknown): void;
}

export enum LoggerType {
  WINSTON = 'winston',
  PINO = 'pino',
}

type IPinoOptions = {
  type: LoggerType.PINO;
  options?: PinoLoggerOptions<LogLevel> | DestinationStream;
};

type IWinstonOptions = {
  type: LoggerType.WINSTON;
  options?: WinstonLoggerOptions | DestinationStream;
};

export type ILoggerOptions = IPinoOptions | IWinstonOptions
