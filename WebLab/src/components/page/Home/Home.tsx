import React from 'react';
import "./Home.css";
import HeroSection from "../../features/HeroSection/HeroSection";
import DestinationSection from "../../features/DestinationSection/DestinationSection";

const Home = () => {
    return (
        <div>
            <HeroSection/>
            <DestinationSection/>
        </div>
    );
};

export default Home;