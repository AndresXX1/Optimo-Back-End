import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestResetPasswordDto {
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
