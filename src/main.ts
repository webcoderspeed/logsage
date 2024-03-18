import { createLogger, transports, format } from 'winston';
import { LoggerModule } from './logger/logger.module';
import { LoggerService } from './logger/logger.service';
export { LoggerModule, LoggerService };
export * from './types';
export * from './interceptors';

export { createLogger, transports, format };
