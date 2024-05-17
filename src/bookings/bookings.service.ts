import {
  BadRequestException,
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
import { FindBookingBy } from './enums/findBookingBy.enum';

import { BookingHandlerDto } from './dto/booking-handler.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingState } from './enums/bookingState';
import {
  endOfWeek,
  format,
  isAfter,
  isWithinInterval,
  startOfWeek,
} from 'date-fns';
import { UserService } from 'src/user/user.service';
import { isValidObjectId, Types } from 'mongoose';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
    private readonly mailerService: MailerService,
  ) {}

  //!TODO: Revisar si en el dia no hay reservas
  async checkBookings(checkBooking: CheckBookingDto) {
    let isValid = false;
    const { startTime, endingTime } = checkBooking;
    if (isAfter(startTime, endingTime)) {
      return true;
    }
    const bookings = await this.bookingModel.find().lean();
    console.log(bookings);
    bookings.forEach((booking) => {
      if (
        isWithinInterval(booking.startTime, {
          start: startTime,
          end: endingTime,
        })
      ) {
        isValid = true;
      }
    });
    return isValid;
  }

  //!TODO: Revisar las fechas limites de los espacios antes de hacer una reserva
  async createBooking(createBookingDto: CreateBookingDto, user: IUserRequest) {
    try {
      if (await this.checkBookings(createBookingDto)) {
        throw new BadRequestException('Bookings already exist');
      }
      console.log(createBookingDto);
      const booking = new this.bookingModel({
        ...createBookingDto,
        bookingToken: uuidv4(),
        state: BookingState.Pending,
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
    if (filter in FindBookingBy) {
      if (filter === 'all') return await this.bookingModel.find();
  
      if (!isValidObjectId(id)) {
        throw new BadRequestException('Invalid ObjectId');
      }
  
      const bookings = await this.bookingModel.find({ [filter]: new Types.ObjectId(id) });
  
      if (!bookings.length) {
        throw new NotFoundException('Bookings not found');
      }
      return bookings;
    } else {
      throw new BadRequestException(
        'Filter not valid, valid filters are user,state,id,day ',
      );
    }
  }

  async BookingsHandler(bookingHandler: BookingHandlerDto) {
    try {
      const { bookingToken, state } = bookingHandler;
      const booking = await this.bookingModel.findOne({
        bookingToken: bookingToken,
      });
      if (!booking) {
        throw new NotFoundException('Booking not found');
      }
      booking.state = state;
      return booking.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async updateBookingById(bookingToUpdate: UpdateBookingDto) {
    try {
      const { id, ...updateFields } = bookingToUpdate;
      console.log(bookingToUpdate);
      const booking = await this.bookingModel.findById(id);
      if (!booking) {
        throw new NotFoundException('Booking not found');
      }
      return await this.bookingModel.findByIdAndUpdate(id, updateFields, {
        new: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getBookingsByMonth() {
    const bookings = await this.bookingModel.find().lean();
    const bookingsSats = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0,
      total: bookings.length,
      cancel: 0,
    };
    bookings.forEach((book) => {
      const month = format(book.startTime, 'MMM');
      bookingsSats[month]++;
      book.state === BookingState.Canceled && bookingsSats.cancel++;
    });
    return bookingsSats;
  }

  async getBookingsThisWeek() {
    const now = new Date();

    const startOfWeekDate = startOfWeek(now, { weekStartsOn: 1 });
    const endOfWeekDate = endOfWeek(now, { weekStartsOn: 1 });

    startOfWeekDate.setHours(0, 0, 0, 0);
    endOfWeekDate.setHours(23, 59, 59, 999);

    const bookings = await this.bookingModel
      .find({
        startTime: {
          $gte: startOfWeekDate, // Mayor o igual al inicio de la semana
          $lte: endOfWeekDate, // Menor o igual al fin de la semana
        },
      })
      .lean();

    const bookingsStats = {
      Sun: 0,
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
      total: bookings.length,
      cancel: 0,
    };

    if (!bookings.length) {
      throw new NotFoundException('Bookings not found');
    }

    bookings.forEach((booking) => {
      const dayStats = format(booking.startTime, 'EEE');
      bookingsStats[dayStats]++;
      booking.state === BookingState.Canceled && bookingsStats.cancel++;
    });
    return bookingsStats;
  }

  async getBookingsByDay(day: string) {
    console.log(day);
    try {
      const dayToDate = new Date(day);
      if (isNaN(dayToDate.getTime())) {
        throw new BadRequestException('Invalid date format');
      }
      const formatDate = dayToDate.toISOString().split('T')[0];
      const bookings = await this.bookingModel.find({
        $expr: {
          $eq: [
            { $dateToString: { format: '%Y-%m-%d', date: '$startTime' } },
            formatDate,
          ],
        },
      });
      if (!bookings.length) {
        throw new NotFoundException('Bookings not found');
      }
      return bookings;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
