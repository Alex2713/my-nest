import { Module, forwardRef } from '@nestjs/common';
import { UserRolesController } from './user-roles.controller';
import { UserRolesService } from './user-roles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRoleSchema } from './schemas/user-role.schemas';
import { LoggerModule } from '../logger/logger.module';
import { RolesModule } from '../roles/roles.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    LoggerModule,
    RolesModule,
    forwardRef(() => UsersModule),
    MongooseModule.forFeature([{ name: 'UserRole', schema: UserRoleSchema }]),
  ],
  controllers: [UserRolesController],
  providers: [UserRolesService],
  exports: [UserRolesService],
})
export class UserRolesModule { }
