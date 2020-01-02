import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema, Types } from 'mongoose';
import { UserRole } from './interfaces/user-role.interface';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { AnyObject } from 'src/interfaces/common.interface';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/interfaces/role.interface';

@Injectable()
export class UserRolesService {

    constructor(
        @InjectModel('UserRole') private readonly userRoleModel: Model<UserRole>,
        private readonly rolesService: RolesService,
    ) { }

    async insertMany(fUserId: string, createUserRoleDtos: CreateUserRoleDto[]): Promise<any> {
        try {
            const writes: any[] = [{
                deleteMany: { filter: { userId: fUserId } },
            }];
            createUserRoleDtos.forEach(crpd => {
                writes.push({
                    insertOne: { document: crpd },
                });
            });
            return await this.userRoleModel.bulkWrite(writes);
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    async findAll(filter: AnyObject): Promise<any[]> {
        return await this.userRoleModel.find(filter).exec();
    }

    async findByUserId(fUserId: string): Promise<Role[]> {
        const userRoles = await this.userRoleModel.find({ userId: Types.ObjectId(fUserId) }).exec();
        return await Promise.all(userRoles.map(async userRole => {
            return await this.rolesService.findById(userRole.roleId);
        }));
    }
}
