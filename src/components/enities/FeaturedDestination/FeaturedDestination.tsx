import React from 'react';
import './FeaturedDestination.css'

interface FeaturedDestinationProps{
    name: string,
    location: string,
    image: string,
    imageAlt: string,
}

const FeaturedDestination : React.FC<FeaturedDestinationProps> = (props) => {
    return (
        <div className="element">
            <img src={props.image} alt={props.imageAlt}/>
            <div className="elementText">
                <h4>{props.name}</h4>
                <p>{props.location}</p>
            </div>
        </div>
    );
};

export default FeaturedDestination;
