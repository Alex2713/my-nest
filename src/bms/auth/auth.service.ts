import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/bms/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/interfaces/user.interface';
import { BcryptHasher } from './hash.password.bcryptjs';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly passwordHasher: BcryptHasher,
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && await this.passwordHasher.comparePassword(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: User) {
        const payload = { username: user.username, sub: user.id };
        return {
            canUse: await this.passwordHasher.comparePassword(user.username, user.password) ? false : true,
            access_token: this.jwtService.sign(payload),
        };
    }
}
