import React, {FC, useCallback, useEffect, useState} from 'react';
import './CatalogSection.css';
import SortManager from "../../enities/SortManager/SortManager";
import ItemCard from "../../enities/ItemCard/ItemCard";
import {Destination} from "../../assets/utils/Destination";
import FilterManager from "../../enities/FilterManager/FilterManager";
import DestinationServices from "../../../services/DestinationServices";
import {Simulate} from "react-dom/test-utils";
import rateChange = Simulate.rateChange;
import DestinationSection from "../DestinationSection/DestinationSection";
import {DestinationDto} from "../../assets/utils/DestinationDto";

interface CatalogSectionProps {
    onDelete: (id: string) => void,
    onUpdateModal: (destination: Destination) => void,
    filteredDestinations: Array<Destination>,
}

const CatalogSection: FC<CatalogSectionProps> = (props) => {
    return (
        <section className="section-items">
            <div className="item-manager">
                <SortManager/>
                <hr/>
                <FilterManager/>
            </div>
            <div className="item-storage" id="item-storage">
                {props.filteredDestinations.map((value, key) => (
                    <ItemCard key={key} destination={value} onDelete={props.onDelete}
                              onUpdateModal={() => props.onUpdateModal(value)}/>
                ))}
            </div>
        </section>
    );
};

export default CatalogSection;