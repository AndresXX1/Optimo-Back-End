import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type RoomDocument = HydratedDocument<Floor>;

@Schema()
export class Floor {

    @Prop({ required: true })
    number: number;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Room' })
    rooms: string[];
}

export const FloorSchema = SchemaFactory.createForClass(Floor);