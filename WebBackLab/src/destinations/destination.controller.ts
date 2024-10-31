import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Inject,
    Param,
    Post,
    Put,
    Query
} from '@nestjs/common';
import {DestinationService} from "./destination.service";
import {DestinationEntity} from "./destination.entity";
import {ApiOperation, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {DestinationsCreateInputDto} from "./dto/destinations.create.input.dto";
import {EntityNotFoundError, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {DestinationsUpdateInputDto} from "./dto/destinations.update.input.dto";
import {ContinentEnum} from "./utils/ContinentEnum";

@ApiTags('destination')
@Controller('destination')
export class DestinationController {
    constructor(@Inject(DestinationService)
    private destinationService: DestinationService,
    @InjectRepository(DestinationEntity)
    private destinationRepository: Repository<DestinationEntity>) {
    }

    @Get()
    @ApiOperation({ summary: 'Get destination with specific parameters' })
    @ApiQuery({ name: 'sort', required: false, enum: ['price_asc', 'price_desc', 'name_asc', 'name_desc'] })
    @ApiQuery({ name: 'search', required: false })
    @ApiQuery({ name: 'price', required: false })
    @ApiQuery({ name: 'continent', required: false})
    @ApiQuery({ name: 'rate', required: false })
    @ApiQuery({ name: 'id', required: false })
    async showDestinations(
        @Query('sort') sort?: 'price_asc' | 'price_desc' | 'title_asc' | 'title_desc',
        @Query('search') search?: string,
        @Query('price') priceFilter?: number,
        @Query('continent') continentFilter?: ContinentEnum,
        @Query('rate') rateFilter?: number,
        @Query('id') id?: string,
    ): Promise<DestinationEntity[]>{
        try {
            if (id) {
                const destination = await this.destinationRepository.findOneOrFail({ where: { id } });
                return [destination];
            }
            return this.destinationService.showDestination(sort, search, priceFilter, continentFilter, rateFilter, id);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new HttpException('Destination not found', HttpStatus.NOT_FOUND);
            }
            if (e instanceof HttpException && e.getStatus() === HttpStatus.BAD_REQUEST){
                throw e;
            }
            throw new HttpException('An error occurred while creating the destination', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    @ApiOperation({ summary: 'Create a new destination' })
    @ApiResponse({ status: 201, description: 'The destination has been successfully created.' })
    @ApiResponse({ status: 400, description: 'The destination hasn\'t been created' })
    async createDestinations(@Body() destinationsCreateInputDto: DestinationsCreateInputDto): Promise<DestinationEntity> {
        try {
            let title = destinationsCreateInputDto.title;
            const existingDestination = await this.destinationRepository.findOne({where: {title}});
            if (existingDestination !== null){
                throw new HttpException('Entity already exists', HttpStatus.BAD_REQUEST);
            }
            return this.destinationService.createDestinations(
                destinationsCreateInputDto.title,
                destinationsCreateInputDto.description,
                destinationsCreateInputDto.price,
                destinationsCreateInputDto.continent
            );
        }
        catch (e) {
            if (e instanceof HttpException && e.getStatus() === HttpStatus.BAD_REQUEST){
                throw e;
            }
            throw new HttpException('An error occurred while creating the destination', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete()
    @ApiOperation({ summary: 'Delete a destination' })
    @ApiResponse({ status: 200, description: 'The destination has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'The destination was not found.' })
    async deleteDestination(
        @Query("id") id : string
    ) : Promise<void>{
        try {
            const existingDestination = await this.destinationRepository.findOne({where: {id}});
            if (existingDestination !== null) {
                this.destinationService.deleteDestination(id);
            } else {
                throw new HttpException("Entity doesn\`t exist", HttpStatus.NOT_FOUND)
            }
        } catch (e){
            if (e instanceof HttpException && e.getStatus() === HttpStatus.NOT_FOUND){
                throw e;
            }
            throw new HttpException("Internal Server Problem", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put()
    @ApiOperation({ summary: 'Update a destination' })
    @ApiResponse({ status: 200, description: 'The destination has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'The destination was not found.' })
    async updateDestination(@Body() destinationUpdateInputDto : DestinationsUpdateInputDto, @Query("id") id: string) : Promise<void>{
        try{
            const existingDestination = await this.destinationRepository.findOne({where: {id}});
            if (existingDestination !== null) {
               await this.destinationService.updateDestination(id, destinationUpdateInputDto.title, destinationUpdateInputDto.description, destinationUpdateInputDto.price, destinationUpdateInputDto.continent);
            } else {
                throw new HttpException("Entity doesn\`t exist", HttpStatus.NOT_FOUND)
            }
        } catch (e) {
            if (e instanceof HttpException && e.getStatus() === HttpStatus.NOT_FOUND){
                throw e;
            }
            throw new HttpException("Internal Server Problem", HttpStatus.INTERNAL_SERVER_ERROR);        }
    }
}
