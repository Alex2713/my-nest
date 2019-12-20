import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerController } from './logger.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerSchema } from './schemas/logger.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Logger', schema: LoggerSchema }]),
  ],
  providers: [LoggerService],
  controllers: [LoggerController],
  exports: [LoggerService],
})
export class LoggerModule { }
