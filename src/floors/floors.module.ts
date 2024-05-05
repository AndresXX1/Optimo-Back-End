import { Module } from '@nestjs/common';
import { FloorsService } from './floors.service';
import { FloorsController } from './floors.controller';
import { Floor, FloorSchema } from './schema/floor.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Floor.name, schema: FloorSchema },
    ]),
  ],
  controllers: [FloorsController],
  providers: [FloorsService],
})
export class FloorsModule {}
