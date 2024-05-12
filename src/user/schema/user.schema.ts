import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Role } from 'src/common/enums/rol.enum';
import { Status } from 'src/common/enums/status.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: false })
  age: string;

  @Prop({ required: false })
  address: string;

  @Prop({ required: false })
  gender: string;

  @Prop({ required: false })
  rolCompany: string;

  @Prop({ required: false })
  country: string;

  @Prop({ required: false })
  profilePicture: string;

  @Prop({ required: true, default: Status.Active, enum: Status })
  status: Status;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true, default: Role.User, enum: Role })
  role: Role;

  @Prop({ required: false })
  phone: string;

  @Prop({ required: false, default: null })
  resetPasswordToken: string | null;

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Booking',
    required: true,
  })
  bookings: MongooseSchema.Types.ObjectId[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
