import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategys/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategys/jwt.strategy';
import { BcryptHasher } from './hash.password.bcryptjs';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: `xiexiao`,
            signOptions: { expiresIn: '36000s' },
        }),
    ],
    providers: [AuthService, BcryptHasher, LocalStrategy, JwtStrategy],
    exports: [AuthService, BcryptHasher],
})
export class AuthModule { }
