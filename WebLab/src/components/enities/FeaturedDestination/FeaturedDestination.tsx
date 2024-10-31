import React from 'react';
import './FeaturedDestination.css'
import {Link} from "react-router-dom";

interface FeaturedDestinationProps{
    name: string,
    id: string,
    location: string,
    image: string,
    imageAlt: string,
}

const FeaturedDestination : React.FC<FeaturedDestinationProps> = (props) => {
    return (
        <div className="element">
            <Link to={`/catalog/${props.id}`}><img src={props.image} alt={props.imageAlt}/></Link>
            <div className="elementText">
                <h4>{props.name}</h4>
                <p>{props.location}</p>
            </div>
        </div>
    );
};

export default FeaturedDestination;
