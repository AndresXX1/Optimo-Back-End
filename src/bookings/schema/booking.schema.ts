import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { UUID } from 'crypto';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { BookingState } from '../enums/bookingState';

export type BookingDocument = HydratedDocument<Booking>;

@Schema()
export class Booking {
  @Prop({ required: true })
  bookingToken: UUID;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endingTime: Date;

  @Prop({ required: true, enum: BookingState })
  state: BookingState;

  @Prop({ required: false })
  comment: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;
  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Room', required: true })
  // room: Types.ObjectId;
  @Prop({ required: true })
  room: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
