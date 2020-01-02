import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './interfaces/role.interface';
import { AnyObject } from 'src/interfaces/common.interface';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('roles')
export class RolesController {

    constructor(
        private readonly rolesService: RolesService,
    ) { }

    @UseGuards(RolesGuard)
    @Post()
    async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
        return await this.rolesService.create(createRoleDto);
    }

    @UseGuards(RolesGuard)
    @Get()
    async findAll(@Query() filter: AnyObject): Promise<Role[]> {
        return this.rolesService.findAll(filter);
    }
}
