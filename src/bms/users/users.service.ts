import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { AnyObject } from 'src/interfaces/common.interface';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async create(createCatDto: CreateUserDto): Promise<User> {
        const createdCat = new this.userModel(createCatDto);
        return await createdCat.save();
    }

    async findAll(filter: AnyObject): Promise<User[]> {
        return await this.userModel.find()
            .where({
                ...filter,
                username: new RegExp(`^${filter.username || ''}`),
                email: new RegExp(`^${filter.email || ''}`),
                phone: new RegExp(`^${filter.phone || ''}`),
            }).exec();
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
