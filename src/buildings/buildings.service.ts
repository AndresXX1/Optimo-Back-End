import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Building } from './schema/building.schema';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';

@Injectable()
export class BuildingsService {
  constructor(
    @InjectModel(Building.name) private readonly buildingModel: Model<Building>,
  ) {}

  async createBuilding(
    createBuildingDto: CreateBuildingDto,
  ): Promise<Building> {
    const createdBuilding = await this.buildingModel.create(createBuildingDto);
    return createdBuilding;
  }

  async findAll(): Promise<Building[]> {
    const buildings = await this.buildingModel
      .find()
      .populate('rooms')
      .lean()
      .exec();
    return buildings;
  }

  async findOne(id: string): Promise<Building> {
    const building = await this.buildingModel
      .findById(id)
      .populate('rooms')
      .lean()
      .exec();
    return building;
  }

  async updateBuilding(id: string, updateBuildingDto: UpdateBuildingDto): Promise<Building> {
    const buildingUpdated = await this.buildingModel
      .findByIdAndUpdate(id, updateBuildingDto, { new: true })
      .populate('rooms')
      .lean()
      .exec();
    return buildingUpdated;
  }

  async removeBuilding(id: string): Promise<Building> {
    const buildingDeleted = await this.buildingModel
      .findByIdAndDelete(id)
      .populate('rooms')
      .lean()
      .exec();
    return buildingDeleted;
  }
}
