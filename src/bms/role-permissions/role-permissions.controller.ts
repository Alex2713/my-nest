import { Controller, UseGuards, Post, Body, Get, Query, Param } from '@nestjs/common';
import { RolePermissionsService } from './role-permissions.service';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { RolePermission } from './interfaces/role-permission.interface';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../guards/roles.guard';
import { AnyObject } from 'src/interfaces/common.interface';
import { Permission } from '../permissions/interfaces/permission.interface';

@UseGuards(AuthGuard('jwt'))
@Controller('role-permissions')
export class RolePermissionsController {

    constructor(
        private readonly rolePermissionsService: RolePermissionsService,
    ) { }

    @UseGuards(RolesGuard)
    @Post()
    async create(@Body() bodyParams: any): Promise<boolean> {
        const permissionIdArr = bodyParams.permissionIds.split(',');
        const params: CreateRolePermissionDto[] = permissionIdArr.map((rid: number) => {
            return { roleId: bodyParams.roleId, permissionId: rid + '' };
        });
        await this.rolePermissionsService.insertMany(bodyParams.roleId, params);
        return true;
    }

    @UseGuards(RolesGuard)
    @Get()
    async findAll(@Query() filter: AnyObject): Promise<RolePermission[]> {
        return this.rolePermissionsService.findAll(filter);
    }

    @UseGuards(RolesGuard)
    @Get(':roleId')
    async findByRoleId(@Param('roleId') roleId: string): Promise<Permission[]> {
        return this.rolePermissionsService.findByRoleId(roleId);
    }
}
