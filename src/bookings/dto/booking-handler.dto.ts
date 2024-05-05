import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class BookingHandlerDto {
  @IsUUID()
  @IsNotEmpty()
  bookingToken: UUID;

  @IsNotEmpty()
  @IsBoolean()
  busy: boolean;
}
