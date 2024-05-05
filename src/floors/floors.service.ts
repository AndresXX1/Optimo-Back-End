import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFloorDto } from './dto/create-floor.dto';
import { UpdateFloorDto } from './dto/update-floor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Floor } from './schema/floor.schema';
import { Model } from 'mongoose';
import { isUUID } from 'class-validator';

@Injectable()
export class FloorsService {
  
  constructor(
    @InjectModel(Floor.name) private readonly floorModel: Model<Floor>, 
  ) {}

  createFloor(createFloorDto: CreateFloorDto) {
    return 'This action adds a new floor';
  }

  findAll() {
    return `This action returns all floors`;
  }

  findOne(id: string) {
    if (!isUUID(id)) throw new BadRequestException(`${id} is not a valid UUID.`);
    return `This action returns a #${id} floor`;
  }
  
  async updateFloor(floorId: string, updateFloorDto: UpdateFloorDto) {
    if (!isUUID(floorId)) throw new BadRequestException(`${floorId} is not a valid UUID.`);
    const updatedFloor = await this.floorModel.findByIdAndUpdate(floorId, updateFloorDto, { new: true });
    return updatedFloor;
  }

  removeFloor(id: string) {
    return `This action removes a #${id} floor`;
  }
}
