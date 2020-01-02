import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RolePermission } from './interfaces/role-permission.interface';
import { AnyObject } from 'src/interfaces/common.interface';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { Permission } from '../permissions/interfaces/permission.interface';
import { PermissionsService } from '../permissions/permissions.service';

@Injectable()
export class RolePermissionsService {

    constructor(
        @InjectModel('RolePermission') private readonly rolePermissionModel: Model<RolePermission>,
        private permissionsService: PermissionsService,
    ) { }

    async insertMany(fRoleId: string, createRolePermissionDtos: CreateRolePermissionDto[]): Promise<any> {
        try {
            const writes: any[] = [{
                deleteMany: { filter: { roleId: fRoleId } },
            }];
            createRolePermissionDtos.forEach(crpd => {
                writes.push({
                    insertOne: { document: crpd },
                });
            });
            return await this.rolePermissionModel.bulkWrite(writes);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll(filter: AnyObject): Promise<RolePermission[]> {
        return await this.rolePermissionModel.find(filter).exec();
    }

    async findByRoleId(fRoleId: string): Promise<Permission[]> {
        const rolePermissions = await this.rolePermissionModel.find({ roleId: Types.ObjectId(fRoleId) }).exec();
        return await Promise.all(rolePermissions.map(async rolePermission => {
            return await this.permissionsService.findById(rolePermission.permissionId);
        }));
    }
}
