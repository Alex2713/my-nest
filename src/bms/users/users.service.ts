import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { AnyObject } from 'src/interfaces/common.interface';
import { UserRolesService } from '../user-roles/user-roles.service';
import { RolePermissionsService } from '../role-permissions/role-permissions.service';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private readonly userRolesService: UserRolesService,
        private readonly rolePermissionsService: RolePermissionsService, ) { }

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

    async update(id: string, user: User): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, user);
    }

    async findOne(name: string): Promise<User> {
        return await this.userModel.findOne({
            username: name,
        }).exec();
    }

    /**
     * 根据用户id获取用户的权限列表
     * @param uid 用户id
     */
    async getRolesPermissionsById(uid: string): Promise<any[]> {
        const roles = await this.userRolesService.findByUserId(uid);
        return Promise.all(
            roles.map(async role => {
                return await this.rolePermissionsService.findByRoleId(role.id);
            }),
        );
    }
}
