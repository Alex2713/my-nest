import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schemas';
import { LoggerModule } from '../logger/logger.module';
import { BcryptHasher } from '../auth/hash.password.bcryptjs';
import { RolePermissionsModule } from '../role-permissions/role-permissions.module';
import { UserRolesModule } from '../user-roles/user-roles.module';

@Module({
  imports: [
    LoggerModule,
    UserRolesModule,
    RolePermissionsModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [UsersService, BcryptHasher],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule { }
