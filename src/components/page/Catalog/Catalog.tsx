import React, { useState } from 'react';
import Menu from "../../features/Menu/Menu";
import CatalogSection from "../../features/CatalogSection/CatalogSection";
import './Catalog.css';
import CreateModal from "../../enities/CreateModal/CreateModal";
import { Destination } from "../../assets/utils/Destination";
import UpdateModal from "../../enities/UpdateModal/UpdateModal";
import {useDestination} from "../../context/DestinationContext";
import catalogSection from "../../features/CatalogSection/CatalogSection";

const Catalog = () => {
    const [searchOptions, setSearchOptions] = useState<{ term: string, sort: string, price: number, rating: number, country: string }>({ term: '', sort: 'price', price: 0, rating: 0, country: '' });
    const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
    const { destinations, setDestination  } = useDestination();


    const deleteDestination = (id: string) => {
        setDestination(destinations.filter(destination => destination.id !== id));
    };

    const createDestination = (destination: Destination) => {
        const maxId = destinations.length > 0 ? Math.max(...destinations.map(destination => parseInt(destination.id))) : 0;
        destination.id =  (maxId + 1).toString();
        if (destinations.find(someDestination => someDestination.title === destination.title)){
            alert("Same title already exists");
            return;
        }
        if (!destination.title || !destination.image || !destination.price || !destination.description) {
            alert("Missing data");
            return;
        }
        setDestination([...destinations, destination]);
    };

    const updateDestination = (destination: Destination) => {
        if (destinations.find(someDestination => someDestination.title === destination.title && someDestination.id !== destination.id)){
            alert("Same title already exists");
            return;
        }
        const updatedDestinations = destinations.map(oldDestination => {
            if (oldDestination.id === destination.id) {
                return { ...oldDestination, ...destination };
            }
            return oldDestination;
        });
        setDestination(updatedDestinations);
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
            <CatalogSection onDelete={deleteDestination} destinations={destinations} onUpdateModal={handleUpdateModal} setSearchOptions={setSearchOptions} searchOptions={searchOptions}/>
        </div>
    );
};

export default Catalog;