import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Room } from 'src/rooms/schema/rooms.schema';

export type FloorDocument = HydratedDocument<Floor>;

@Schema()
export class Floor {

    @Prop({ required: true })
    number: number;

    @Prop({ required: true, type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Room'}] })
    rooms: Room[];

    @Prop({ required: true })
    level: number;

    @Prop({ required: true })
    area: number;

    @Prop({ required: true })
    capacity: number;
}

export const FloorSchema = SchemaFactory.createForClass(Floor);
