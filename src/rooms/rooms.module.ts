import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { Room, RoomSchema } from './schema/rooms.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Building, BuildingSchema } from 'src/buildings/schema/building.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema },]),
    MongooseModule.forFeature([{ name: Building.name, schema: BuildingSchema },]),
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
