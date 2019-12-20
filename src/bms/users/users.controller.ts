import { Controller, Body, Post, Get, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles.guard';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {

    constructor(
        private readonly userService: UsersService,
    ) { }

    @UseGuards(RolesGuard)
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    @UseGuards(RolesGuard)
    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
}
