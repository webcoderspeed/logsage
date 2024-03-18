import { Module } from '@nestjs/common';
import {  WinstonService} from './winston.service';

@Module({
  imports: [],
  providers: [WinstonService],
})
export class WinstonModule {}
 