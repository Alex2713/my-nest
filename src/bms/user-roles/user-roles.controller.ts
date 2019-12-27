import { Controller, UseGuards, Post, Body, Param, Get, Query } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles.guard';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UserRole } from './interfaces/user-role.interface';
import { AnyObject } from 'src/interfaces/common.interface';

@UseGuards(AuthGuard('jwt'))
@UseGuards(RolesGuard)
@Controller('user-roles')
export class UserRolesController {

    constructor(
        private readonly userRoleService: UserRolesService,
    ) { }

    @UseGuards(RolesGuard)
    @Post('id')
    async create(@Param('id') id: string, @Body() roleIds: number[]): Promise<boolean> {
        const params: CreateUserRoleDto[] = roleIds.map(rid => {
            return { userId: id, roleId: rid + '' };
        });
        await this.userRoleService.insertMany(params);
        return true;
    }

    @UseGuards(RolesGuard)
    @Get()
    async findAll(@Query() filter: AnyObject): Promise<UserRole[]> {
        return this.userRoleService.findAll(filter);
    }
}
