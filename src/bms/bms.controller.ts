import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller('bms')
export class BmsController {

    constructor(private readonly authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('hello')
    async bmsHello(@Request() req) {
        return `hello`;
    }
}
