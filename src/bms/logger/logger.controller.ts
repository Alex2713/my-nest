import { Controller, Body, Post, UseGuards, Get } from '@nestjs/common';
import { CreateLoggerDto } from './dto/create-logger.dto';
import { LoggerService } from './logger.service';
import { AuthGuard } from '@nestjs/passport';
import { Logger } from './interfaces/logger.interface';

@UseGuards(AuthGuard('jwt'))
@Controller('logger')
export class LoggerController {

    constructor(
        private loggerService: LoggerService,
    ) { }

    @Post()
    async create(@Body() createLoggerDto: CreateLoggerDto) {
        return await this.loggerService.create(createLoggerDto);
    }

    @Get()
    async findAll(): Promise<Logger[]> {
        return this.loggerService.findAll();
    }
}
