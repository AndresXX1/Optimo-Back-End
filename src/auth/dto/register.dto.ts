import { Transform } from 'class-transformer';
import { IsString, IsEmail, MinLength, Length } from 'class-validator';

export class RegisterDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  name: string;

  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(6, 20)
  password: string;

  role: string;

  @IsString()
  @MinLength(1)
  phone?: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  lastName: string;

  bookings: [{}];
}
