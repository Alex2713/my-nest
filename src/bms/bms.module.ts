import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BmsController } from './bms.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://alex:123456@localhost:27017/nest',
      { useNewUrlParser: true, useUnifiedTopology: true },
    ),
  ],
  providers: [],
  controllers: [BmsController],
})
export class BmsModule { }
