import { IsString, IsNotEmpty, IsNumber, IsEnum, IsArray } from 'class-validator';
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
    
    @IsArray()
    @IsNotEmpty()
    type: string[];
    
    @IsNumber()
    @IsNotEmpty()
    floorNumber: number;

    @IsString()
    plans: string;

    @IsString()
    description: string;

    @IsArray()
    images: string[];

    @IsEnum(['Activo', 'Inactivo'])
    state: string;
}
