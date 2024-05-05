import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  roomId: string;

  @IsNotEmpty()
  @IsDate()
  day: Date;

  @IsNotEmpty()
  @IsString()
  startTime: string;

  @IsNotEmpty()
  @IsString()
  endingTime: string;
}
