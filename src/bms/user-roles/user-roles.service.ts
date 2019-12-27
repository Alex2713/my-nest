import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRole } from './interfaces/user-role.interface';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { AnyObject } from 'src/interfaces/common.interface';

@Injectable()
export class UserRolesService {

    constructor(@InjectModel('UserRole') private readonly userRoleModel: Model<UserRole>) { }

    async insertMany(createUserRoleDtos: CreateUserRoleDto[]): Promise<UserRole> {
        try {
            return await this.userRoleModel.insertMany(createUserRoleDtos);
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    async findAll(filter: AnyObject): Promise<UserRole[]> {
        return await this.userRoleModel.find()
            .find(filter).exec();
    }
}
