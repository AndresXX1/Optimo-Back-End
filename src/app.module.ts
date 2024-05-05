import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { BookingsModule } from './bookings/bookings.module';

import { RoomsModule } from './rooms/rooms.module';
import { FloorsModule } from './floors/floors.module';
import { MailerModule } from './mailer/mailer.module';
import { ConfigModule } from '@nestjs/config';
import { BuildingsModule } from './buildings/buildings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://optimo123:optimo123@optimo.zlmwo9b.mongodb.net/?retryWrites=true&w=majority&appName=Optimo',
    ),
    AuthModule,
    UserModule,

    BuildingsModule,
    BookingsModule,

    RoomsModule,
    FloorsModule,

    MailerModule,
  ],
})
export class AppModule {}
