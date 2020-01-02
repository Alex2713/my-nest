import { Controller, UseGuards, Post, Body, Get, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsService } from './permissions.service';
import { RolesGuard } from '../../guards/roles.guard';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { Permission } from './interfaces/permission.interface';
import { AnyObject } from 'src/interfaces/common.interface';

@UseGuards(AuthGuard('jwt'))
@Controller('permissions')
export class PermissionsController {

    constructor(
        private readonly permissionsService: PermissionsService,
    ) { }

    @UseGuards(RolesGuard)
    @Post()
    async create(@Body() createPermissionDto: CreatePermissionDto): Promise<Permission> {
        return await this.permissionsService.create(createPermissionDto);
    }

    @UseGuards(RolesGuard)
    @Get()
    async findAll(@Query() filter: AnyObject): Promise<Permission[]> {
        return this.permissionsService.findAll(filter);
    }
}
