import { IsString, IsInt, IsNotEmpty, Min} from 'class-validator';

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

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  numberOfFloors: number;
}
