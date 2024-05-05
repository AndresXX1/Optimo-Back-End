import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class DeleteAccountDto {
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
