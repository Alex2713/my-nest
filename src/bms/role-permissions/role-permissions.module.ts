import { Module } from '@nestjs/common';
import { RolePermissionsController } from './role-permissions.controller';
import { RolePermissionsService } from './role-permissions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RolePermissionSchema } from './schemas/role-permission.schemas';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    LoggerModule,
    MongooseModule.forFeature([{ name: 'RolePermission', schema: RolePermissionSchema }]),
  ],
  controllers: [RolePermissionsController],
  providers: [RolePermissionsService],
})
export class RolePermissionsModule { }
