import { Module, forwardRef } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchema } from './schemas/role.schemas';
import { LoggerModule } from '../logger/logger.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    LoggerModule,
    forwardRef(() => UsersModule),
    MongooseModule.forFeature([{ name: 'Role', schema: RoleSchema }]),
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule { }
