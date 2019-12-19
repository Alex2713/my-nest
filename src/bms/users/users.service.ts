import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async create(createCatDto: CreateUserDto): Promise<User> {
        const createdCat = new this.userModel(createCatDto);
        return await createdCat.save();
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async findOne(name: string): Promise<User> {
        return await this.userModel.findOne({
            username: name,
        }).exec();
    }
}
