import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RolePermission } from './interfaces/role-permission.interface';
import { AnyObject } from 'src/interfaces/common.interface';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';

@Injectable()
export class RolePermissionsService {

    constructor(@InjectModel('RolePermission') private readonly rolePermissionModel: Model<RolePermission>) { }

    async insertMany(createRolePermissionDtos: CreateRolePermissionDto[]): Promise<RolePermission> {
        try {
            return await this.rolePermissionModel.insertMany(createRolePermissionDtos);
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    async findAll(filter: AnyObject): Promise<RolePermission[]> {
        return await this.rolePermissionModel.find()
            .find(filter).exec();
    }
}
