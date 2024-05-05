import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Role } from 'src/common/enums/rol.enum';
import { Status } from 'src/common/enums/status.enum';

export class UpdateFullUserDto {
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @Length(6, 20)
  password?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  age?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsEnum(Status)
  rolCompany?: Status;
}
