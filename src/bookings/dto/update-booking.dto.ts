import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateBookingDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsOptional()
  @IsDate()
  day: Date;

  @IsOptional()
  @IsString()
  startTime: string;

  @IsOptional()
  @IsString()
  endingTime: string;

  @IsOptional()
  @IsBoolean()
  busy: string;
}
