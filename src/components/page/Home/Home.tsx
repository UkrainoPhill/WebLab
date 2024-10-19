import React from 'react';
import "./Home.css";
import HeroSection from "../../features/HeroSection/HeroSection";
import DestinationSection from "../../features/DestinationSection/DestinationSection";
import {Destination} from "../../assets/utils/Destination";
import Vevey from '../../assets/images/VeveySwitzerland.svg'
import Fajingshan from '../../assets/images/FanjingshanChina.svg'
import Skadar from '../../assets/images/SkadarMontenegro.svg'
import Raja from '../../assets/images/RajaAmpatIndonesia.svg'

const Home = () => {
    const destinations: Array<Destination> = [
        {
            id: "",
            image: Fajingshan,
            title: "Fanjingshan, China",
            description: "A beautiful mountain in China.",
            price: 1200,
            continent: "Asia",
            rate: 1,
            lastUpdated: "2023-10-01"
        },
        {
            id: "",
            image: Vevey,
            title: "Vevey, Switzerland",
            description: "A picturesque town in Switzerland.",
            price: 1500,
            continent: "Europe",
            rate: 1,
            lastUpdated: "2023-10-02"
        },
        {
            id: "",
            image: Skadar,
            title: "Skadar, Montenegro",
            description: "A stunning lake in Montenegro.",
            price: 1100,
            continent: "Europe",
            rate: 1,
            lastUpdated: "2023-10-03"
        },
        {
            id: "",
            image: Raja,
            title: "Raja Ampat, Indonesia",
            description: "An archipelago in Indonesia.",
            price: 2000,
            continent: "Asia",
            rate: 1,
            lastUpdated: "2023-10-04"
        }
    ];
    return (
        <div>
            <HeroSection/>
            <DestinationSection destinations={destinations}/>
        </div>
    );
};

export default Home;