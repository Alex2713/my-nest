import { Module } from '@nestjs/common';
import { UserRolesController } from './user-roles.controller';
import { UserRolesService } from './user-roles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRoleSchema } from './schemas/user-role.schemas';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    LoggerModule,
    MongooseModule.forFeature([{ name: 'UserRole', schema: UserRoleSchema }]),
  ],
  controllers: [UserRolesController],
  providers: [UserRolesService],
})
export class UserRolesModule { }
