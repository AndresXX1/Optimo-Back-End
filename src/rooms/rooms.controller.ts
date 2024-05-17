import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

interface Order {
  type: 'asc' | 'desc';
}

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post(':buildingId/types')
  create(@Body() createRoomDto: CreateRoomDto, @Param('buildingId') buildingId: string) {
    return this.roomsService.createRoom(buildingId, createRoomDto);
  }

  @Get('/findByBuilding/:buildingId')
  findAllByFloor(@Param('buildingId') buildingId: string) {
    return this.roomsService.findAllByBuilding(buildingId);
  }  

  @Get('/findByBuildingSorted/:buildingId')
  findAllByBuildingSortedByFloor(@Param('buildingId') buildingId: string, @Query('order') order: Order['type']){
    return this.roomsService.findAllByBuildingSortedByFloor(buildingId, order);
  }

  @Get('/count')
  findNumberOfRooms() {
    return this.roomsService.findNumberOfRooms();
  }

  @Get('/findByName/:buildingId/search')
  findOneByName(@Param('buildingId') buildingId: string, @Query('name') name: string) {
    return this.roomsService.findOneByName(buildingId, name);
  }

  @Get(':roomId')
  findOneById(@Param('buildingId') buildingId: string, @Param('roomId') roomId: string) {
    return this.roomsService.findOneById( roomId);
  }

  @Patch(':buildingId/types/:roomId')
  update(@Param('buildingId') buildingId: string, @Param('roomId') roomId: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(buildingId, roomId, updateRoomDto);
  }

  @Delete('/delete/:buildingId/types/:roomId')
  remove(@Param('buildingId') buildingId: string, @Param('roomId') roomId: string) {
    return this.roomsService.remove(buildingId, roomId);
  }

  @Get('/ranking')
  findRanking() {
    return this.roomsService.rankingRoomsByBookings();
  }

  @Get('/findAvailableRooms')
  findAvailableRooms() {
    return this.roomsService.filterByDaysAndHours();
  }
}
