import { IsString, IsNotEmpty } from 'class-validator';
import { Room } from 'src/rooms/schema/rooms.schema';

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
  
  @IsString()
  @IsNotEmpty()
  blueprints: string;
  
  // rooms: Room[];
}
