import React from 'react';
import './HeroSection.css';
import Thousand1 from './images/Thousand-02 1@2x.svg'

const HeroSection = () => {
    return (
        <section className="heroSection">
            <div>
                <h1>Explore and Travel</h1>
                <h2>Holiday finder</h2>
                <hr/>
                <form>
                    <label>
                        <select defaultValue="">
                            <option value="" disabled hidden>Location</option>
                            <option>option1</option>
                            <option>option2</option>
                        </select>
                        <select defaultValue="">
                            <option value="" disabled hidden>Activity</option>
                            <option>option1</option>
                            <option>option2</option>
                        </select>
                        <select defaultValue="">
                            <option value="" disabled hidden>Grade</option>
                            <option>option1</option>
                            <option>option2</option>
                        </select>
                        <select defaultValue="">
                            <option value="" disabled hidden>Date</option>
                            <option>option1</option>
                            <option>option2</option>
                        </select>
                    </label>
                    <button className="explore">Explore</button>
                </form>
            </div>
            <img src={Thousand1} alt="Thousand 1"/>
        </section>
    );
};

export default HeroSection;