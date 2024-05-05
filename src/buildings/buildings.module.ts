import { Module } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { BuildingsController } from './buildings.controller';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { Building, BuildingSchema } from './schema/building.schema';
import * as AutoIncrementFactory from 'mongoose-sequence';
import { Connection } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Building.name, schema: BuildingSchema },
    ]),
  ],
  controllers: [BuildingsController],
  providers: [BuildingsService],
})
export class BuildingsModule {}
