import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateLoggerDto } from './dto/create-logger.dto';
import { Model } from 'mongoose';

@Injectable()
export class LoggerService {

    constructor(@InjectModel('Logger') private readonly loggerModel: Model<Logger>) { }

    async create(createLoggerDto: CreateLoggerDto): Promise<Logger> {
        const createdCat = new this.loggerModel(createLoggerDto);
        return await createdCat.save();
    }
}
