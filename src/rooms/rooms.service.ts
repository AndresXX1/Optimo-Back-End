import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from './schema/rooms.schema';
import { Model } from 'mongoose';
import { Floor } from 'src/floors/schema/floor.schema';

@Injectable()
export class RoomsService {
  
  constructor(
    @InjectModel(Floor.name) private readonly floorModel: Model<Floor>,
    @InjectModel(Room.name) private readonly roomModel: Model<Room>
  ) {}

  async createRoom(floorId: string, createRoomDto: CreateRoomDto): Promise<Room> {
    // Find by ID
    const floor = await this.floorModel.findById(floorId);
    if (!floor) {
      throw new Error('El piso especificado no existe.');
    }
    // Create a new room
    const createdRoom = await this.roomModel.create(createRoomDto);
    // Add the room to the floor
    floor.rooms.push(createdRoom.id);
    // Save the floor
    await floor.save();
    return createdRoom;
  }

  async findAllByFloor(floorId: string) {
    const floor = await this.floorModel.findById(floorId).populate('rooms').exec();
    if (!floor) {
      throw new Error('El piso especificado no existe.');
    }
    return floor.rooms;
  }

  findOne(id: string) {
    return `This action returns a #${id} room`;
  }

  async update(floorId: string, roomId: string, updateRoomDto: UpdateRoomDto): Promise<Room> {
    // Find by ID
    const floor = await this.floorModel.findById(floorId);
    if (!floor) {
      throw new Error('El piso especificado no existe.');
    }
    // Update the room
    const updatedRoom = await this.roomModel.findByIdAndUpdate(roomId, updateRoomDto, { new: true });
    return updatedRoom;
  }

  remove(id: string) {
    return `This action removes a #${id} room`;
  }
}
