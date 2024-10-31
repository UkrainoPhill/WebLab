import React from 'react';
import HolidayFinder from "../../enities/HolidayFinder/HolidayFinder";
import './HeroSection.css';
import Thousand1 from './images/Thousand-02 1@2x.svg'

const HeroSection = () => {
    return (
        <section className="heroSection">
            <div>
                <h1>Explore and Travel</h1>
                <h2>Holiday finder</h2>
                <hr/>
                <HolidayFinder/>
            </div>
            <img src={Thousand1} alt="Thousand 1"/>
        </section>
    );
};

export default HeroSection;