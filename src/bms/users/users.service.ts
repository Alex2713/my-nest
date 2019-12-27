import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { AnyObject } from 'src/interfaces/common.interface';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async create(createCatDto: CreateUserDto): Promise<User> {
        const createdCat = new this.userModel(createCatDto);
        try {
            return await createdCat.save();
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    async findAll(filter: AnyObject): Promise<User[]> {
        const param = {
            ...filter,
            username: new RegExp(`^${filter.username || ''}`),
            email: new RegExp(`^${filter.email || ''}`),
            phone: new RegExp(`^${filter.phone || ''}`),
        };
        return await this.userModel.find()
            .find(param).exec();
    }

    async update(id: string, user: User): Promise<User[]> {
        return await this.userModel.findByIdAndUpdate(id, user);
    }

    async findOne(name: string): Promise<User> {
        return await this.userModel.findOne({
            username: name,
        }).exec();
    }
}
