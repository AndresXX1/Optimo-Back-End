import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from './schema/rooms.schema';
import { Model } from 'mongoose';
import { Building } from 'src/buildings/schema/building.schema';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
    @InjectModel(Building.name) private readonly buildingModel: Model<Building>,
  ) {}

  async createRoom(
    buildingId: string,
    createRoomDto: CreateRoomDto,
  ): Promise<Room> {
    // Find by ID
    const floor = await this.buildingModel.findById(buildingId);
    if (!floor) {
      throw new Error('El edificio especificado no existe.');
    }
    // Create a new room
    const createdRoom = await this.roomModel.create(createRoomDto);
    // Add the room to the floor
    floor.rooms.push(createdRoom.id);
    // Save the floor
    await floor.save();
    return createdRoom;
  }

  async findAllByBuilding(buildingId: string): Promise<Room[]> {
    const building = await this.buildingModel.findById(buildingId);
    if (!building) {
      throw new Error('El piso especificado no existe.');
    }
    const rooms = await this.roomModel.find({ _id: { $in: building.rooms } });
    return rooms;
  }

  async findAllByBuildingSortedByFloor(
    buildingId: string,
    order: string,
  ): Promise<Room[]> {
    const building = await this.buildingModel.findById(buildingId);
    if (!building) {
      throw new Error('El piso especificado no existe.');
    }
    if (order !== 'asc' && order !== 'desc') {
      throw new Error('El parámetro "order" debe ser "asc" o "desc"');
    }
    const sortOrder = order === 'asc' ? 1 : -1;
    const rooms = await this.roomModel
      .find({ _id: { $in: building.rooms } })
      .sort({ floorNumber: sortOrder });
    return rooms;
  }

  async findNumberOfRooms(): Promise<number> {
    let count = 0;
    const allBuildings = await this.buildingModel
      .find()
      .populate('rooms')
      .lean()
      .exec();
    console.log(allBuildings);
    for (let i = 0; i < allBuildings.length; i++) {
      count += allBuildings[i].rooms.length;
    }
    return count;
  }

  async findOneByName(buildingId: string, name: string): Promise<string[]> {
    const building: Building = await this.buildingModel
      .findById(buildingId)
      .populate('rooms')
      .lean()
      .exec();
    if (!building) {
      throw new Error('El edificio especificado no existe.');
    }
    const roomsWithName = building.rooms.filter((room: any) =>
      room.name.toLowerCase().trim().includes(name.toLowerCase().trim()),
    );
    return roomsWithName;
  }

  async update(
    buildingId: string,
    roomId: string,
    updateRoomDto: UpdateRoomDto,
  ): Promise<Room> {
    const building = await this.buildingModel.findById(buildingId);
    if (!building) {
      throw new Error('El edificio especificado no existe.');
    }
    const updatedRoom = await this.roomModel.findByIdAndUpdate(
      roomId,
      updateRoomDto,
      { new: true },
    );
    return updatedRoom;
  }

  async remove(buildingId: string, roomId: string): Promise<string> {
    const building = await this.buildingModel.findById(buildingId);
    if (!building) {
      throw new Error('El edificio especificado no existe.');
    }
    // Remove the room
    await this.roomModel.findByIdAndDelete(roomId);
    return 'Room removed';
  }
}