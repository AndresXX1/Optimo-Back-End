import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateFullUserDto } from './dto/updateFullUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch()
  updateUser(@Body() userToUpdate: UpdateUserDto) {
    console.log(userToUpdate);

    return this.userService.updateUser(userToUpdate);
  }
  @Patch('superAdmin')
  updateFullUser(@Body() userToUpdate: UpdateFullUserDto) {
    console.log(userToUpdate);

    return this.userService.updateFullUser(userToUpdate);
  }

  @Get()
  getAllRolUsers() {
    return this.userService.getAllRolUsers();
  }
  
  @Get('all')
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}
