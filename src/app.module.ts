import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BmsModule } from './bms/bms.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    BmsModule,
    MongooseModule.forRoot('mongodb://alex:123456@localhost:27017/nest',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
