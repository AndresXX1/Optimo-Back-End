import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post(':floorId/types')
  create(@Body() createRoomDto: CreateRoomDto, @Param('floorId') floorId: string) {
    return this.roomsService.createRoom(floorId, createRoomDto);
  }

  @Get(':floorId')
  findAllByFloor(@Param('floorId') floorId: string){
    return this.roomsService.findAllByFloor(floorId);
  }

  @Get(':floorId/:roomId')
  findOne(@Param('id') roomId: string) {
    return this.roomsService.findOne(roomId);
  }

  @Patch(':floorId/types/:roomId')
  update(@Param('floorId') floorId: string, @Param('roomId') roomId: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(floorId, roomId, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(id);
  }
}
