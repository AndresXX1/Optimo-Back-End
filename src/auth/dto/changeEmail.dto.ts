import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class ChangeEmailDto {
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
  @IsEmail()
  newEmail: string;
}
