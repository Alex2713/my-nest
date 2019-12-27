import { Controller, UseGuards, Post, Body, Get, Query, Param } from '@nestjs/common';
import { RolePermissionsService } from './role-permissions.service';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { RolePermission } from './interfaces/role-permission.interface';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles.guard';
import { AnyObject } from 'src/interfaces/common.interface';

@UseGuards(AuthGuard('jwt'))
@UseGuards(RolesGuard)
@Controller('role-permissions')
export class RolePermissionsController {

    constructor(
        private readonly rolePermissionsService: RolePermissionsService,
    ) { }

    @UseGuards(RolesGuard)
    @Post()
    async create(@Param('id') id: string, @Body() permissionIds: number[]): Promise<boolean> {
        const params: CreateRolePermissionDto[] = permissionIds.map(rid => {
            return { roleId: id, permissionId: rid + '' };
        });
        await this.rolePermissionsService.insertMany(params);
        return true;
    }

    @UseGuards(RolesGuard)
    @Get()
    async findAll(@Query() filter: AnyObject): Promise<RolePermission[]> {
        return this.rolePermissionsService.findAll(filter);
    }
}
