import { IsString, IsNotEmpty } from 'class-validator';
import { Booking } from 'src/bookings/schema/booking.schema';

export class CreateRoomDto {
    
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    booking: Booking[];
    
    @IsString()
    @IsNotEmpty()
    location: string;
    
    @IsString()
    @IsNotEmpty()
    equipment: string;
    
    @IsString()
    @IsNotEmpty()
    type: string;
}
