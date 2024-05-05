import { PartialType } from '@nestjs/mapped-types';
import { CreateFloorDto } from './create-floor.dto';
import { Room } from 'src/rooms/schema/rooms.schema';

export class UpdateFloorDto extends PartialType(CreateFloorDto) {

    number: number;
    rooms: Room[];
}
