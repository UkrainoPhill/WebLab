import {Destination} from "./Destination";

export interface Cart {
    id: string;
    amount: number;
    isHot: boolean;
    destination: Destination;
}

export interface CartDto{
    amount: number;
    isHot: boolean;
    destinationId: string;
}