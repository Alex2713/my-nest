import { Model, Schema } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Permission } from './interfaces/permission.interface';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { AnyObject } from 'src/interfaces/common.interface';

@Injectable()
export class PermissionsService {

    constructor(@InjectModel('Permission') private readonly permissionModel: Model<Permission>) { }

    async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
        const createPermission = new this.permissionModel(createPermissionDto);
        try {
            return await createPermission.save();
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    async findAll(filter: AnyObject): Promise<Permission[]> {
        const param = {
            ...filter,
            name: new RegExp(`^${filter.name || ''}`),
        };
        return await this.permissionModel.find()
            .find(param).exec();
    }

    async findById(id: Schema.Types.ObjectId): Promise<Permission> {
        return await this.permissionModel.findById(id).exec();
    }
}
