import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';

import { Booking } from './schema/booking.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { MailerService } from 'src/mailer/mailer.service';
import { IRequestMail } from 'src/common/interfaces/requestMail.interface';
import { IUserRequest } from 'src/common/interfaces/requestUser.interface';
import { CheckBookingDto } from './dto/check-booking.dto';
import { FindBookingBy } from 'src/bookings/enums/findBookingBy.enum';
import { UUID } from 'crypto';
import { BookingHandlerDto } from './dto/booking-handler.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
    private readonly mailerService: MailerService,
  ) {}

  async checkBookings(checkBooking: CheckBookingDto) {
    const { day, startTime, endingTime } = checkBooking;
    return await this.bookingModel.exists({
      day: day,
      startTime: startTime,
      endingTime: endingTime,
    });
  }

  //!TODO: Revisar las fechas limites de los espacios antes de hacer una reserva
  async createBooking(createBookingDto: CreateBookingDto, user: IUserRequest) {
    try {
      if (await this.checkBookings(createBookingDto)) {
        throw new BadRequestException('the booking already exists');
      }
      const booking = new this.bookingModel({
        ...createBookingDto,
        bookingToken: uuidv4(),
      });
      const mail: IRequestMail = {
        recipients: { name: user.name, address: user.email },
        subject: 'Booking created',
        html: `<p>Hola ${user.name},</p><p>Su reserva ha sido creada exitosamente. Aquí está su token de reserva: <strong>${booking.bookingToken}</strong></p><p>Por favor, lleve este token consigo cuando se presente.</p><p>Saludos,</p><p>El equipo de reservas</p>`,
      };
      await this.mailerService.sendEmail(mail);
      return booking.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAllBy(filter: string, id: string) {
    console.log(filter in FindBookingBy);
    if (filter in FindBookingBy) {
      const bookings = (await this.bookingModel.find({ [filter]: id })) || [];
      console.log(bookings);
      if (!bookings.length) {
        throw new NotFoundException('Bookings not found');
      }
      return bookings;
    } else {
      throw new BadRequestException(
        'Filter not valid, valid filters are User,Room,Floor ',
      );
    }
  }

  async BookingsHandler(bookingHandler: BookingHandlerDto) {
    try {
      const { bookingToken, busy } = bookingHandler;
      const booking = await this.bookingModel.findOne({
        bookingToken: bookingToken,
      });
      if (!booking) {
        throw new NotFoundException('Booking not found');
      }
      booking.busy = busy;
      return booking.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async updateBookingById(bookingToUpdate: UpdateBookingDto) {
    try {
      const { id } = bookingToUpdate;
      const booking = await this.bookingModel.findById(id);
      if (!booking) {
        throw new NotFoundException('Booking not found');
      }
      return await this.bookingModel.findByIdAndUpdate(id, bookingToUpdate, {
        new: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
