import React, { useState } from 'react';
import Menu from "../../features/Menu/Menu";
import CatalogSection from "../../features/CatalogSection/CatalogSection";
import './Catalog.css';
import CreateModal from "../../enities/CreateModal/CreateModal";
import { Destination, destinations as initialDestinations } from "../../assets/utils/Destination";
import UpdateModal from "../../enities/UpdateModal/UpdateModal";

const Catalog = () => {
    const [destinations, setDestinations] = useState<Destination[]>(initialDestinations);
    const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

    const deleteDestination = (id: string) => {
        setDestinations(destinations.filter(destination => destination.id !== id));
    };

    const createDestination = (destination: Destination) => {
        if (destinations.some(value => value.id === destination.id)) {
            return;
        }
        if (!destination.title || !destination.image || !destination.price || !destination.description){
            alert("Missing data");
            return;
        }
        setDestinations([...destinations, destination]);
    };

    const updateDestination = (destination: Destination) => {
        const updatedDestinations = destinations.map(oldDestination => {
            if (oldDestination.id === destination.id) {
                return { ...oldDestination, ...destination };
            }
            return oldDestination;
        });
        setDestinations(updatedDestinations);
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
            <Menu onCreateModal={handleCreateModal} />
            {createModal && <CreateModal onClose={handleCloseCreateModal} onCreate={createDestination} />}
            {updateModal && selectedDestination && (
                <UpdateModal
                    onClose={handleCloseUpdateModal}
                    onUpdate={updateDestination}
                    destination={selectedDestination}
                />
            )}
            <CatalogSection onDelete={deleteDestination} destinations={destinations} onUpdateModal={handleUpdateModal}/>
        </div>
    );
};

export default Catalog;