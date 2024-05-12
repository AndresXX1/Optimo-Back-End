import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsString()
  room: string;

  @IsNotEmpty()
  @IsString()
  tittle: string;

  @IsOptional()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(Date.parse(value)))
  startTime: Date;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(Date.parse(value)))
  endingTime: Date;
}
