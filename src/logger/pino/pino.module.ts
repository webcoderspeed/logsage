import { Module } from '@nestjs/common'
import { PinoService } from './pino.service'

@Module({
  imports: [],
  providers: [PinoService],
})
export class PinoModule {}
