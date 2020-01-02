import { Controller, UseGuards, Post, Body, Param, Get, Query } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../guards/roles.guard';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UserRole } from './interfaces/user-role.interface';
import { AnyObject } from 'src/interfaces/common.interface';
import { Schema, Types } from 'mongoose';
import { Role } from '../roles/interfaces/role.interface';

@UseGuards(AuthGuard('jwt'))
@Controller('user-roles')
export class UserRolesController {

    constructor(
        private readonly userRoleService: UserRolesService,
    ) { }

    @UseGuards(RolesGuard)
    @Post()
    async create(@Body() bodyParams: any): Promise<boolean> {
        const permissionIdArr = bodyParams.roleIds.split(',');
        const params: CreateUserRoleDto[] = permissionIdArr.map(rid => {
            return { userId: bodyParams.userId, roleId: rid + '' };
        });
        await this.userRoleService.insertMany(bodyParams.userId, params);
        return true;
    }

    @UseGuards(RolesGuard)
    @Get()
    async findAll(@Query() filter: AnyObject): Promise<UserRole[]> {
        return this.userRoleService.findAll(filter);
    }

    @UseGuards(RolesGuard)
    @Get(':userId')
    async findByUserId(@Param('userId') userId: string): Promise<Role[]> {
        return this.userRoleService.findByUserId(userId);
    }
}
