import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BmsController } from './bms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from './logger/logger.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';
import { UserRolesModule } from './user-roles/user-roles.module';
import { RolePermissionsModule } from './role-permissions/role-permissions.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    LoggerModule,
    PermissionsModule,
    RolesModule,
    UserRolesModule,
    RolePermissionsModule,
  ],
  providers: [],
  controllers: [BmsController],
})
export class BmsModule { }
