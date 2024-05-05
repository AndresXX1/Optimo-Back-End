import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './schema/booking.schema';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
    MailerModule,
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
