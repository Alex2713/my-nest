import { Controller, Body, Post, Get, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles.guard';
import { BcryptHasher } from '../auth/hash.password.bcryptjs';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {

    constructor(
        private readonly userService: UsersService,
        private readonly passwordHasher: BcryptHasher,
    ) { }

    @UseGuards(RolesGuard)
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        const nn = {
            ...createUserDto,
            password: await this.passwordHasher.hashPassword(createUserDto.password),
        }
        return await this.userService.create(nn as CreateUserDto);
    }

    @UseGuards(RolesGuard)
    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
}
