import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BmsController } from './bms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://alex:123456@localhost:27017/nest',
      { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    ),
    LoggerModule,
  ],
  providers: [],
  controllers: [BmsController],
})
export class BmsModule { }
