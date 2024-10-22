import React, {FC, useState} from 'react';
import './DestinationSection.css';
import OrangeArrow from './images/orange_v.svg';
import FormButton from "../../common/FormButton/FormButton";
import FeaturedDestination from "../../enities/FeaturedDestination/FeaturedDestination";
import {Destination} from "../../assets/utils/Destination";
import {Link} from "react-router-dom";
import {useDestination} from "../../context/DestinationContext";


const DestinationSection  = () => {
    const {destinations, setDestination} = useDestination();
    const [counter, setCounter] = useState<number>(4);

    const handleShowMore = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setCounter(prevCounter => prevCounter + 4);
    }

    return (
        <section className="destinationsSection">
            <div className="destinationsTitle">
                <h1>Featured destinations</h1>
                <Link to="/catalog">View all <img src={OrangeArrow} alt="arrow"/></Link>
            </div>
            <div className="elements">
                {destinations.slice(0, counter).map((value, index) => (
                    <FeaturedDestination
                        key={index}
                        id={value.id}
                        name={value.title}
                        location={value.price.toString()}
                        image={value.image}
                        imageAlt="destinationImage"
                    />
                ))}
            </div>
            <div className={"showMore"}>
                {counter < destinations.length && (
                    <FormButton name={"Show More"} onClick={handleShowMore}/>
                )}
            </div>
        </section>
    );
};

export default DestinationSection;