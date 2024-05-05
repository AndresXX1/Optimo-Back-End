import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Building } from './schema/building.schema';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class BuildingsService {

  constructor(@InjectModel(Building.name) private readonly buildingModel: Model<Building> ) {}
  
  async createBuilding(createBuildingDto: CreateBuildingDto): Promise<Building> {
    const createdBuilding = await this.buildingModel.create(createBuildingDto);
    return createdBuilding;
  }

  async findAll(): Promise<Building[]> {
    const buildings = await this.buildingModel.find().exec();
    return buildings;
  }

  async findOne(id: string) {
    if (!isUUID(id)) throw new BadRequestException(`${id} is not a valid UUID.`);
    const building = await this.buildingModel.findById(id).exec();
    return building;
  }

  async updateBuilding(id: string, updateBuildingDto: UpdateBuildingDto) {
    if (!isUUID(id)) throw new BadRequestException(`${id} is not a valid UUID.`);
    const buildingUpdated = await this.buildingModel.findByIdAndUpdate(id, updateBuildingDto, { new: true });
    return buildingUpdated;
  }

  async removeBuilding(id: string) {
    if (!isUUID(id)) throw new BadRequestException(`${id} is not a valid UUID.`);
    const buildingDeleted = await this.buildingModel.findByIdAndDelete(id);
    return buildingDeleted;
  }
}
