import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Building } from './schema/building.schema';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';

@Injectable()
export class BuildingsService {

  constructor(@InjectModel(Building.name) private readonly buildingModel: Model<Building> ) {}

  /**
   * Creates a new building.
   * @param createBuildingDto - The data for creating the building.
   * @returns A promise that resolves to the created building.
   */
  async create(createBuildingDto: CreateBuildingDto): Promise<Building> {
    const createdBuilding = new this.buildingModel(createBuildingDto);
    return createdBuilding.save();
  }

  /**
   * Retrieves all buildings from the database.
   * @returns A promise that resolves to an array of Building objects.
   */
  async findAll(): Promise<Building[]> {
    return this.buildingModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} building`;
  }

  update(id: number, updateBuildingDto: UpdateBuildingDto) {
    return `This action updates a #${id} building`;
  }

  remove(id: number) {
    return `This action removes a #${id} building`;
  }
}
