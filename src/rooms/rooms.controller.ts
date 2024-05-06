import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('rooms')
export class RoomsController {
 constructor(private readonly roomsService: RoomsService) {}

 @Post()
 create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.createRoom(createRoomDto);
 }

 @Get()
 findAllByFloor() {
    return this.roomsService.findAllByFloor();
 }

 @Get(':id')
 findOne(@Param('id') roomId: string) {
    return this.roomsService.findOne(roomId);
 }

 @Patch(':id')
 update(@Param('id') roomId: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(roomId, updateRoomDto);
 }

 @Delete(':id')
 remove(@Param('id') id: string) {
    return this.roomsService.remove(id);
 }
}