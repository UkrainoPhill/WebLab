import { Module } from '@nestjs/common';
import { DestinationService } from './destination.service';
import { DestinationEntity } from './destination.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinationController } from './destination.controller';

@Module({
    imports: [TypeOrmModule.forFeature([DestinationEntity])],
    providers: [DestinationService],
    controllers: [DestinationController],
    exports: [DestinationService],
})
export class DestinationModule {}