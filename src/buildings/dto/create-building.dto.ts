import { IsString, IsNotEmpty } from 'class-validator';
import { Floor } from 'src/floors/schema/floor.schema';

export class CreateBuildingDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  owner: string;

  @IsNotEmpty()
  Floors: Floor[];
}
