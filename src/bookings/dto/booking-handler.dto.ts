import { IsBoolean, IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { UUID } from 'crypto';
import { BookingState } from '../enums/bookingState';

export class BookingHandlerDto {
  @IsUUID()
  @IsNotEmpty()
  bookingToken: UUID;

  @IsNotEmpty()
  @IsEnum(BookingState)
  state: BookingState;
}
