import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';




@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://user_node_coffee:QSuiUGBrcLKk24jj@clustercoffee.yjcs0.mongodb.net/nestRestApi'),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule { }
