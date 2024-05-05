import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Booking } from 'src/bookings/schema/booking.schema';

export type RoomDocument = HydratedDocument<Room>;

@Schema()
export class Room {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Booking' })
    booking: Booking;

    @Prop({ required: true })
    location: string;

    @Prop({ required: true })
    equipment: string;

    @Prop({ required: true })
    type: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
