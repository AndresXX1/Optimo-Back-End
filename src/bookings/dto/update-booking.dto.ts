import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { BookingState } from '../enums/bookingState';

export class UpdateBookingDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  tittle: string;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(Date.parse(value)))
  startTime: Date;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(Date.parse(value)))
  endingTime: Date;

  @IsOptional()
  @IsString()
  comment: string;

  @IsOptional()
  @IsEnum(BookingState)
  state: BookingState;
}
