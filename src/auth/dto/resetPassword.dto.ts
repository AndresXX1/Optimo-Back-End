import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsUUID('4')
  resetPasswordToken: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  password: string;
}
