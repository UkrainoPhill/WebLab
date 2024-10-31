import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DestinationModule } from './destinations/destination.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {AppDataSource} from './DataSource';
import {DataSource} from "typeorm";

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options), DestinationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}