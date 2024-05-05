import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Floor } from './floor.schema';

export type BuildingDocument = HydratedDocument<Building>;

@Schema()
export class Building {

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  owner: string;

  @Prop({ required: true, type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Floor'}] })
  floors: Floor[];
}

export const BuildingSchema = SchemaFactory.createForClass(Building);
