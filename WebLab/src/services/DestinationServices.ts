import $api from "../http/api";
import {AxiosResponse} from "axios";
import {Destination} from "../components/assets/utils/Destination";
import {SearchOptions} from "../components/assets/utils/SearchOptions";
import {DestinationDto} from "../components/assets/utils/DestinationDto";


export default class DestinationServices {
    static async getDestinations (searchOptions: SearchOptions | null): Promise<AxiosResponse<Destination[]>> {
        return $api.get('/destination', {
            params: searchOptions
        });
    }

    static async createDestination (destination: DestinationDto): Promise<AxiosResponse<Destination>> {
        return $api.post('/destination', destination);
    }

    static async updateDestination (destination_id: string, destination: DestinationDto): Promise<AxiosResponse<void>> {
        return $api.put(`/destination?id=${destination_id}`, destination);
    }

    static async deleteDestination (destination_id: string): Promise<AxiosResponse<void>> {
        return $api.delete(`/destination?id=${destination_id}`);
    }
}