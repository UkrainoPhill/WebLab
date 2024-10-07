import React from 'react';
import "./Home.css";
import Footer from "../../features/Footer/Footer";
import Header from "../../features/Header/Header";
import HeroSection from "../../features/HeroSection/HeroSection";
import LearnMoreSection from "../../features/LearnMoreSection/LearnMoreSection";
import DestinationSection from "../../features/DestinationSection/DestinationSection";

const Home = () => {
    return (
        <div>
            <Header/>
            <HeroSection/>
            <LearnMoreSection/>
            <DestinationSection/>
            <Footer/>
        </div>
    );
};

export default Home;