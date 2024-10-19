import React, { FC, useState } from 'react';
import './CatalogSection.css';
import SortManager from "../../enities/SortManager/SortManager";
import CountManager from "../../enities/CountManager/CountManager";
import ItemCard from "../../enities/ItemCard/ItemCard";
import { Destination, destinations } from "../../assets/utils/Destination";
import FilterManager from "../../enities/FilterManager/FilterManager";

interface CatalogSectionProps {
    destinations: Array<Destination>,
    onDelete: (id: string) => void;
    onUpdateModal: (destination: Destination) => void;
}

const CatalogSection: FC<CatalogSectionProps> = (props) => {
    const [filters, setFilters] = useState({ continent: '', rate: 0, price: 0 });

    const handleFilterChange = (newFilters: { continent: string, rate: number, price: number }) => {
        setFilters(newFilters);
    };

    //const filteredDestinations = destinations.filter(value => (value.continent === filters.continent))



    return (
        <section className="section-items">
            <div className="item-manager">
                <SortManager />
                <hr/>
                <CountManager />
                <hr/>
                <FilterManager onFilterChange={handleFilterChange} />
            </div>
            <div className="item-storage" id="item-storage">
                {destinations.map((value, key) => (
                    <ItemCard key={key} destination={value} onDelete={props.onDelete} onUpdateModal={() => props.onUpdateModal(value)} />
                ))}
            </div>
        </section>
    );
};

export default CatalogSection;