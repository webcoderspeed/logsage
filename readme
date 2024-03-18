# NestJS Logger

NestJS Logger is a versatile logging solution built on top of Pino and Winston, designed specifically for NestJS applications. It provides developers with the flexibility to select between Pino and Winston as the underlying logging mechanism and configure logging behavior according to their preferences.

## Features

- Seamless integration with NestJS applications.
- Option to choose between Pino and Winston as the logging library.
- Easy configuration management for fine-tuning logging behavior.
- Supports various configuration options such as log levels, output formats, and log destinations.
- Enhanced debugging capabilities for gaining insights into application behavior and performance.

## Installation

```bash
npm install logsage
```

## Usage

### AppModule Configuration

This configuration sets up logging in the AppModule:

`Imports`: The LoggerModule is imported, enabling logging features within the application.

`Providers`:

- AppService is provided as a singleton, serving as a service layer.
- LoggerService is provided using a factory function to initialize a Winston logger (LoggerType.WINSTON).

`Controllers`: The AppController is declared, handling incoming HTTP requests.

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule, LoggerService, LoggerType } from 'logsage';

@Module({
  imports: [LoggerModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: LoggerService,
      useFactory: () => {
        return new LoggerService(LoggerType.WINSTON);
      },
    },
  ],
})
export class AppModule {}
```

### Service Injection with LoggerService

> In the AppController, the LoggerService is injected as a dependency alongside AppService. This setup leverages the logger initialized in the AppModule configuration.

```typescript
import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { LoggerService } from 'logsage';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: LoggerService
  ) {}

  @Get()
  getHello(@Req() req: Request): string {
    this.logger.info('X-Trace-ID', req.headers['X-Trace-ID']);
    return this.appService.getHello();
  }
}
```

### Jaeger Tracer Integration

> This snippet demonstrates integrating Jaeger client for distributed tracing in a NestJS app. The TracingInterceptor from logsage intercepts requests, initialized with Jaeger tracer for distributed tracing.

> The X-Trace-ID header is automatically injected into incoming requests when integrating Jaeger client for distributed tracing in a NestJS application. This snippet demonstrates how to set up distributed tracing using Jaeger client and logsage's TracingInterceptor.

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TracingInterceptor, initialiseTrace } from 'logsage';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serviceName = 'AppService';

  app.useGlobalInterceptors(
    new TracingInterceptor(initialiseTrace(serviceName))
  );

  await app.listen(1337);
}
bootstrap();
```

This setup ensures that tracing information is seamlessly injected into incoming requests, facilitating distributed tracing across your NestJS application. With Jaeger client and the TracingInterceptor from logsage, you can effectively monitor request flows and diagnose performance issues, ultimately enhancing the observability of your application.

## Contributing

If you have suggestions for improvements, bug reports, or other contributions, please feel free to open an issue or create a pull request.

## License

This project is licensed under the `MIT License`.