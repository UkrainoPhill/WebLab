import React, {useCallback, useEffect, useState} from 'react';
import './DestinationSection.css';
import OrangeArrow from './images/orange_v.svg';
import FormButton from "../../common/FormButton/FormButton";
import FeaturedDestination from "../../enities/FeaturedDestination/FeaturedDestination";
import {Link} from "react-router-dom";
import DestinationServices from "../../../services/DestinationServices";
import {Destination} from "../../assets/utils/Destination";
import {getDestinations, RootState} from "../../../store";
import {useDispatch, useSelector} from "react-redux";


const DestinationSection  = () => {
    const [counter, setCounter] = useState<number>(4);
    const {destination} = useSelector((state: RootState) => state.destinationReducer);

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
                {destination?.slice(0, counter).map((value, index) => (
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
                {counter < (destination || []).length && (
                    <FormButton name={"Show More"} onClick={handleShowMore}/>
                )}
            </div>
        </section>
    );
};

export default DestinationSection;