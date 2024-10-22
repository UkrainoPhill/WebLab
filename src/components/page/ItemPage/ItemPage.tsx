import React from 'react';
import './ItemPage.css';
import {Link, useParams} from "react-router-dom";
import {useDestination} from "../../context/DestinationContext";

const ItemPage = () => {
    const { id } = useParams<{ id: string }>();
    const { destinations } = useDestination();
    const destination = destinations.find(d => parseInt(d.id) === Number(id));

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
                        <div className='continent-item-page'>Continent: {destination.continent}</div>
                    </div>
                    <h1 className={'title-item-page'}>{destination.title}</h1>
                    <p className={'description-item-page'}>{destination.description}</p>
                    <p className={'price-item-page'}>Price: {destination.price} $</p>
                    <p className={'last-updated-item-page'}>Last Updated: {destination.lastUpdated.slice(0, 10)}</p>
                    <div className={'navigation-item-page'}>
                        <Link to={'/catalog'} className='go-back-button'>Catalog</Link>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default ItemPage;