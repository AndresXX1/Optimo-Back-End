import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as mongoose from 'mongoose';

import { InternalServerErrorException } from '@nestjs/common';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/common/enums/rol.enum';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = new this.userModel(createUserDto);
      return user.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userModel.findOne({ email: email });

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findByEmailWithPassword(email: string) {
    try {
      const user = await this.userModel
        .findOne({
          email: email,
        })
        .select('+password');
      if (!user) {
        throw new NotFoundException(`User ${email} not found`);
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateUser(updateUser: UpdateUserDto) {
    try {
      const userExists = await this.userModel.findById(updateUser.id);
      if (!userExists) {
        throw new NotFoundException('User not found');
      }
      console.log(updateUser);
      return await this.userModel.findByIdAndUpdate(updateUser.id, updateUser, {
        new: true,
      });
    } catch (error) {
      if (error instanceof mongoose.Error.CastError && error.path === '_id') {
        throw new BadRequestException('Invalid ObjectId format');
      }

      throw new InternalServerErrorException('Error updating user');
    }
  }
  async updateFullUser(updateUser: UpdateUserDto) {
    try {
      const userExists = await this.userModel.findById(updateUser.id);
      if (!userExists) {
        throw new NotFoundException('User not found');
      }
      if ('password' in updateUser && updateUser.password) {
        updateUser.password = await bcrypt.hash(
          updateUser.password as string,
          10,
        );
      }
      return await this.userModel.findByIdAndUpdate(updateUser.id, updateUser, {
        new: true,
      });
    } catch (error) {
      if (error instanceof mongoose.Error.CastError && error.path === '_id') {
        throw new BadRequestException('Invalid ObjectId format');
      }

      throw new InternalServerErrorException('Error updating user');
    }
  }

  async findUserByToken(resetPasswordToken: string) {
    try {
      const user = await this.userModel.findOne({
        resetPasswordToken: resetPasswordToken,
      });
      if (!user) {
        throw new BadRequestException();
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllRolUsers() {
    try {
      return await this.userModel.find({ role: Role.User });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllUsers() {
    try {
      return await this.userModel.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async deleteAccount(id: string) {
    try {
      return await this.userModel.findOneAndDelete({ id: id });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
