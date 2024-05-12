import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

@Schema()
export class Room {

    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop({ required: true, type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Booking'}]})
    booking: string[];

    @Prop({ required: true })
    location: string;

    @Prop({ required: true })
    equipment: string[];

    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    floorNumber: number;    

    @Prop()
    images: string;

    @Prop({ defaultOptions: ['Activo', 'Inactivo'] })
    state: string;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
