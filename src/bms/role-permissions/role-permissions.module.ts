import { Module, forwardRef } from '@nestjs/common';
import { RolePermissionsController } from './role-permissions.controller';
import { RolePermissionsService } from './role-permissions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RolePermissionSchema } from './schemas/role-permission.schemas';
import { LoggerModule } from '../logger/logger.module';
import { Mongoose } from 'mongoose';
import { PermissionsModule } from '../permissions/permissions.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    LoggerModule,
    PermissionsModule,
    forwardRef(() => UsersModule),
    MongooseModule.forFeature([{ name: 'RolePermission', schema: RolePermissionSchema }]),
  ],
  controllers: [RolePermissionsController],
  providers: [RolePermissionsService, Mongoose],
  exports: [RolePermissionsService],
})
export class RolePermissionsModule { }
