import { Controller, Body, Post } from '@nestjs/common';
import { CreateLoggerDto } from './dto/create-logger.dto';
import { LoggerService } from './logger.service';

@Controller('logger')
export class LoggerController {

    constructor(
        private loggerService: LoggerService,
    ) { }

    @Post()
    async create(@Body() createLoggerDto: CreateLoggerDto) {
        return await this.loggerService.create(createLoggerDto);
    }
}
