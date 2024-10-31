import React, {useEffect, useState} from 'react';
import './ItemPage.css';
import {Link, useParams} from "react-router-dom";
import {Destination} from "../../assets/utils/Destination";
import DestinationServices from "../../../services/DestinationServices";

const ItemPage = () => {
    const {id} = useParams<{ id: string }>();
    const [destination, setDestination] = useState<Destination | null>(null)
    const [continent, setContinent] = useState<string>('');
    useEffect(() => {
        try {
            if (id != null) {
                DestinationServices.getDestinations({id: id}).then(({data}) => setDestination(data[0]));
            }
        } catch (e) {
        }
    }, [id]);


    useEffect(() => {
        if (destination) {
            switch (destination.continent) {
                case 0:
                    setContinent("Africa");
                    break;
                case 1:
                    setContinent("Asia");
                    break;
                case 2:
                    setContinent("Europe");
                    break;
                case 3:
                    setContinent("North America");
                    break;
                case 4:
                    setContinent("South America");
                    break;
                case 5:
                    setContinent("Australia");
                    break;
                case 6:
                    setContinent("Antarctica");
                    break;
                default:
                    setContinent("");
            }
        }
    }, [destination]);

    if (!destination) {
        return <div className='item-page'>Destination not found</div>;
    }
    return (
        <section className='item-page'>
            <div className='info'>
                <img className='avatar' src={destination.image} alt={destination.title}/>
                <div className='details'>
                    <div className='filters'>
                        <div className='rate-item-page'>Rate: {destination.rate}</div>
                        <div className='continent-item-page'>Continent: {continent}</div>
                    </div>
                    <h1 className={'title-item-page'}>{destination.title}</h1>
                    <p className={'description-item-page'}>{destination.description}</p>
                    <p className={'price-item-page'}>Price: {destination.price} $</p>
                    <p className={'last-updated-item-page'}>Last Updated: {destination.last_updated.slice(0, 10)}</p>
                    <div className={'navigation-item-page'}>
                        <Link to={'/catalog'} className='go-back-button'>Catalog</Link>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default ItemPage;