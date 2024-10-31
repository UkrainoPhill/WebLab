import { ApiProperty } from '@nestjs/swagger';
import { ContinentEnum } from '../utils/ContinentEnum';

export class DestinationsCreateInputDto {
    @ApiProperty({ description: 'The title of the destination' })
    title: string;

    @ApiProperty({ description: 'The description of the destination' })
    description: string;

    @ApiProperty({ description: 'The price of the destination' })
    price: number;

    @ApiProperty({ description: 'The continent of the destination', enum: ContinentEnum })
    continent: ContinentEnum;
}