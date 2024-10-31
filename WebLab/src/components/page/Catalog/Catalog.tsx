import React, {useCallback, useEffect, useState} from 'react';
import Menu from "../../features/Menu/Menu";
import CatalogSection from "../../features/CatalogSection/CatalogSection";
import './Catalog.css';
import CreateModal from "../../enities/CreateModal/CreateModal";
import {Destination} from "../../assets/utils/Destination";
import UpdateModal from "../../enities/UpdateModal/UpdateModal";
import DestinationServices from "../../../services/DestinationServices";
import {DestinationDto} from "../../assets/utils/DestinationDto";

const Catalog = () => {
    const [searchOptions, setSearchOptions] = useState<{ search?: string, sort?: string, price?: number,  rate?: number , continent?: number, id?: string}>({ search: '', sort: '', price: undefined, rate: undefined, continent: undefined, id: ''});
    const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
    const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);

    const fetchDestinations = useCallback(async () => {
        const { data } = await DestinationServices.getDestinations(searchOptions);
        setFilteredDestinations(data);
    }, [searchOptions])

    const createDestination = async (destination: Destination) => {
        if(!destination.title || !destination.description || !destination.price) {
            alert("Missing data");
            return;
        }
        try {
            const destinationDto : DestinationDto = {
                continent: destination.continent,
                description: destination.description,
                price: destination.price,
                title: destination.title
            };
            await DestinationServices.createDestination(destinationDto);
            await fetchDestinations();
        } catch (e) {
            alert("This entity exist")
        }
    };

    useEffect(() => {
        fetchDestinations();
    }, [fetchDestinations, searchOptions]);

    const deleteDestination = async (id: string) => {
        await DestinationServices.deleteDestination(id);
        await fetchDestinations();
    };

    const updateDestination = async (destination: Destination) => {
        if(!destination.title || !destination.description || !destination.price) {
            alert("Missing data");
            return;
        }
        const destinationDto : DestinationDto = {
            continent: destination.continent,
            description: destination.description,
            price: destination.price,
            title: destination.title
        };
        await DestinationServices.updateDestination(destination.id, destinationDto);
        await fetchDestinations();
    };

    const [createModal, setCreateModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);

    const handleCreateModal = () => {
        setCreateModal(true);
    };

    const handleUpdateModal = (destination: Destination) => {
        setSelectedDestination(destination);
        setUpdateModal(true);
    };

    const handleCloseCreateModal = () => {
        setCreateModal(false);
    };

    const handleCloseUpdateModal = () => {
        setUpdateModal(false);
        setSelectedDestination(null);
    };

    return (
        <div className={"catalogBody"}>
            <Menu onCreateModal={handleCreateModal} setSearchOptions={setSearchOptions}  />
            {createModal && <CreateModal onClose={handleCloseCreateModal} onCreate={createDestination} />}
            {updateModal && selectedDestination && (
                <UpdateModal
                    onClose={handleCloseUpdateModal}
                    onUpdate={updateDestination}
                    destination={selectedDestination}
                />
            )}
            <CatalogSection onDelete={deleteDestination} onUpdateModal={handleUpdateModal} setSearchOptions={setSearchOptions} searchOptions={searchOptions} filteredDestinations={filteredDestinations}/>
        </div>
    );
};

export default Catalog;