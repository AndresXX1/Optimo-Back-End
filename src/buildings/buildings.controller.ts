import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';

@Controller('buildings')
export class BuildingsController {
  constructor(private readonly buildingsService: BuildingsService) {}

  @Post()
  /**
    * Creates a new building.
    * @param createBuildingDto - The data for creating the building.
    * @returns The newly created building.
    * @throws BadRequestException if there is an error creating the building.
    */
  async create(@Body() createBuildingDto: CreateBuildingDto) {
    try {
      const buildingCreated = await this.buildingsService.create(createBuildingDto);
      return buildingCreated;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  findAll() {
    return this.buildingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buildingsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBuildingDto: UpdateBuildingDto,
  ) {
    return this.buildingsService.update(+id, updateBuildingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buildingsService.remove(+id);
  }
}
