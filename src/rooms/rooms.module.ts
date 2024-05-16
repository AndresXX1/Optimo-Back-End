import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { Room, RoomSchema } from './schema/rooms.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Building, BuildingSchema } from 'src/buildings/schema/building.schema';
import { Booking, BookingSchema } from 'src/bookings/schema/booking.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema },]),
    MongooseModule.forFeature([{ name: Building.name, schema: BuildingSchema },]),
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema },]),
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
