import React, {FC} from 'react';
import './DestinationSection.css';
import OrangeArrow from './images/orange_v.svg';
import FormButton from "../../common/FormButton/FormButton";
import FeaturedDestination from "../../enities/FeaturedDestination/FeaturedDestination";
import {Destination} from "../../assets/utils/Destination";
import {Link} from "react-router-dom";


interface DestinationSectionProps{
    destinations: Array<Destination>,
}


const DestinationSection : FC<DestinationSectionProps> = (props) => {
    return (
        <section className="destinationsSection">
            <div className="destinationsTitle">
                <h1>Featured destinations</h1>
                <Link to="/catalog">View all <img src={OrangeArrow} alt="arrow"/></Link>
            </div>
            <div className="elements">
                {props.destinations.map((value, index) => (
                    <FeaturedDestination
                        key={index}
                        name={value.title}
                        location={value.price.toString()}
                        image={value.image}
                        imageAlt="destinationImage"
                    />
                ))}
            </div>
            <div className={"showMore"}>
                <FormButton name={"Show More"}/>
            </div>
        </section>
    );
};

export default DestinationSection;