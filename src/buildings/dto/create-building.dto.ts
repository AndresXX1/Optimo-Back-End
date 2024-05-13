import { IsOptional, IsString, IsNotEmpty, IsArray, IsMongoId } from 'class-validator';

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

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  rooms: string[]; // Corregido a 'rooms' y ajustado para permitir un array vacío
}