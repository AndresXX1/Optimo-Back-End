import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

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
  
  @Prop()
  blueprints: string;

  @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Room'}] })
  rooms: string[];
}

export const BuildingSchema = SchemaFactory.createForClass(Building);
