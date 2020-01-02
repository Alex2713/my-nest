import { Model, Schema } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './interfaces/role.interface';
import { AnyObject } from 'src/interfaces/common.interface';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {

    constructor(@InjectModel('Role') private readonly roleModel: Model<Role>) { }

    async create(createRoleDto: CreateRoleDto): Promise<Role> {
        const createRole = new this.roleModel(createRoleDto);
        try {
            return await createRole.save();
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    async findAll(filter: AnyObject): Promise<Role[]> {
        const param = {
            ...filter,
            name: new RegExp(`^${filter.name || ''}`),
        };
        return await this.roleModel.find()
            .find(param).exec();
    }

    async findById(id: Schema.Types.ObjectId): Promise<Role> {
        return await this.roleModel.findById(id).exec();
    }
}
