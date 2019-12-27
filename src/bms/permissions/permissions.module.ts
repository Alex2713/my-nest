import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionSchema } from './schemas/permission.schemas';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    LoggerModule,
    MongooseModule.forFeature([{ name: 'Permission', schema: PermissionSchema }]),
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule {}
