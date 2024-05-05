import { Transform } from 'class-transformer';
import { IsEmail, IsString, Length, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(6, 20)
  password: string;
}
