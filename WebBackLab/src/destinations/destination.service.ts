import {Injectable} from '@nestjs/common';
import {FindManyOptions, FindOptionsWhere, ILike, LessThanOrEqual, MoreThanOrEqual, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {DestinationEntity} from "./destination.entity";
import {ContinentEnum} from "./utils/ContinentEnum";
import {v4} from "uuid";

@Injectable()
export class DestinationService {
    constructor(
        @InjectRepository(DestinationEntity)
        private destinationRepository: Repository<DestinationEntity>,
    ) {}

    showDestination(
        sort?: 'price_asc' | 'price_desc' | 'title_asc' | 'title_desc',
        search?: string,
        priceFilter?: number,
        continentFilter?: ContinentEnum,
        rateFilter?: number,
        id?: string
    ) {
        const whereConditions: FindOptionsWhere<DestinationEntity> = {};

        if (search) {
            whereConditions.title = ILike(`%${search.trim()}%`);
        }

        if (priceFilter !== undefined) {
            whereConditions.price = LessThanOrEqual(priceFilter);
        }

        if (continentFilter !== undefined) {
            whereConditions.continent = continentFilter;
        }

        if (rateFilter !== undefined) {
            whereConditions.rate = MoreThanOrEqual(rateFilter);
        }

        const options: FindManyOptions<DestinationEntity> = {
            where: whereConditions,
        };

        if (sort) {
            const [field, direction] = sort.split('_');
            options.order = { [field]: direction.toUpperCase() };
        }

        return this.destinationRepository.find(options);
    }



    async createDestinations(title: string, description: string, price: number, continent: ContinentEnum): Promise<DestinationEntity> {
        const destination = new DestinationEntity();
        destination.title = title;
        destination.price = price;
        destination.description = description;
        destination.continent = continent;
        destination.rate = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        destination.last_updated = new Date();
        destination.id = v4();
        destination.image = "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg";
        await this.destinationRepository.insert(destination);
        return destination;
    }

    async deleteDestination(id: string){
        await this.destinationRepository.delete(id);
    }

    async updateDestination(id: string, title: string, description: string, price: number, continent: ContinentEnum){
        this.destinationRepository.findOne({where: {id}}).then(
            destination => {
                destination.title = title;
                destination.description = description;
                destination.price = price;
                destination.continent = continent;
                this.destinationRepository.save(destination);
                return destination;
            }
        );
    }
}
