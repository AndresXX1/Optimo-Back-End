import { FindBookingBy } from 'src/bookings/enums/findBookingBy.enum';

export class CheckBookingDto {
  day: Date;

  startTime: string;

  endingTime: string;
}
