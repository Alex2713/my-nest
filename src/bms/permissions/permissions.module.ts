import { Module, forwardRef } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionSchema } from './schemas/permission.schemas';
import { LoggerModule } from '../logger/logger.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    LoggerModule,
    forwardRef(() => UsersModule),
    MongooseModule.forFeature([{ name: 'Permission', schema: PermissionSchema }]),
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
