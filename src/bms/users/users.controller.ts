import { Controller, Body, Post, Get, UseGuards, Param, Query, Patch } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles.guard';
import { BcryptHasher } from '../auth/hash.password.bcryptjs';
import { AnyObject } from 'src/interfaces/common.interface';
import { of } from 'rxjs';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {

    constructor(
        private readonly userService: UsersService,
        private readonly passwordHasher: BcryptHasher,
    ) { }

    @UseGuards(RolesGuard)
    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<boolean> {
        const nn = {
            ...createUserDto,
            password: await this.passwordHasher.hashPassword(createUserDto.username),
        };
        await this.userService.create(nn as CreateUserDto);
        return true;
    }

    @UseGuards(RolesGuard)
    @Get()
    async findAll(@Query() filter: AnyObject): Promise<User[]> {
        return this.userService.findAll(filter);
    }

    @UseGuards(RolesGuard)
    @Patch(':id')
    async update(@Param('id') id, @Body() user: User): Promise<boolean> {
        await this.userService.update(id, user);
        return true;
    }
}
