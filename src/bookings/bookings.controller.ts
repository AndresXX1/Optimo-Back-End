import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  Put,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

import { Auth } from 'src/common/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/activeUser.decorator';
import { IUserRequest } from 'src/common/interfaces/requestUser.interface';
import { FindBookingBy } from 'src/bookings/enums/findBookingBy.enum';

import { BookingHandlerDto } from './dto/booking-handler.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}
  @Auth(Role.User)
  @Post()
  create(
    @Body() createBookingDto: CreateBookingDto,
    @ActiveUser() user: IUserRequest,
  ) {
    return this.bookingsService.createBooking(createBookingDto, user);
  }

  @Get()
  findAllBy(@Query('filter') filter: string, @Query('id') id: string) {
    return this.bookingsService.findAllBy(filter, id);
  }

  @Put('/changeState')
  bookingHandler(@Body() bookingHandler: BookingHandlerDto) {
    return this.bookingsService.BookingsHandler(bookingHandler);
  }
  @Put()
  UpdateBooking(@Body() bookingToUpdate: UpdateBookingDto) {
    return this.bookingsService.updateBookingById(bookingToUpdate);
  }
}
