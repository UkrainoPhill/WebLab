import Fajingshan from "../images/FanjingshanChina.svg";
import Vevey from "../images/VeveySwitzerland.svg";
import Skadar from "../images/SkadarMontenegro.svg";
import Raja from "../images/RajaAmpatIndonesia.svg";

export class Destination {
    id: string = "";
    image: string = "";
    title: string = "";
    description: string = "";
    price: number = 0;
    continent: number = 0;
    rate: number = 0;
    last_updated: string = "";
}

export const destinationsData: Array<Destination> = [{
    id: "1",
    image: Fajingshan,
    title: "Fanjingshan, China",
    description: "A beautiful mountain in China.",
    price: 1200,
    continent: 1,
    rate: 5,
    last_updated: "2023-10-01"
}, {
    id: "2",
    image: Vevey,
    title: "Vevey, Switzerland",
    description: "A picturesque town in Switzerland.",
    price: 1500,
    continent: 2,
    rate: 4,
    last_updated: "2023-10-02"
}, {
    id: "3",
    image: Skadar,
    title: "Skadar, Montenegro",
    description: "A stunning lake in Montenegro.",
    price: 1100,
    continent: 2,
    rate: 3,
    last_updated: "2023-10-03"
}, {
    id: "4",
    image: Raja,
    title: "Raja Ampat, Indonesia",
    description: "An archipelago in Indonesia.",
    price: 2000,
    continent: 1,
    rate: 5,
    last_updated: "2023-10-04"
}];