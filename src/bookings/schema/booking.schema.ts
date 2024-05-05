import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { UUID } from 'crypto';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type BookingDocument = HydratedDocument<Booking>;

@Schema()
export class Booking {
  @Prop({ required: true })
  day: Date;

  @Prop({ required: true })
  bookingToken: UUID;

  @Prop({ required: true })
  startTime: string;

  @Prop({ required: true })
  endingTime: string;

  @Prop({ required: true })
  busy: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Room', required: true })
  room: Types.ObjectId;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Floor', required: true })
  floor: Types.ObjectId;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
