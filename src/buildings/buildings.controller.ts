import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';

@Controller('buildings')
export class BuildingsController {
  constructor(private readonly buildingsService: BuildingsService) {}

  @Post('/create')
  async create(@Body() createBuildingDto: CreateBuildingDto) {
    return await this.buildingsService.createBuilding(createBuildingDto);
  }

  @Get()
  findAll() {
    return this.buildingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buildingsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBuildingDto: UpdateBuildingDto,
  ) {
    return this.buildingsService.updateBuilding(id, updateBuildingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buildingsService.removeBuilding(id);
  }
}
