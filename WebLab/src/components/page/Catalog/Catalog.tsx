import React, {useCallback, useEffect, useState} from 'react';
import Menu from "../../features/Menu/Menu";
import CatalogSection from "../../features/CatalogSection/CatalogSection";
import './Catalog.css';
import CreateModal from "../../enities/CreateModal/CreateModal";
import {Destination} from "../../assets/utils/Destination";
import UpdateModal from "../../enities/UpdateModal/UpdateModal";
import DestinationServices from "../../../services/DestinationServices";
import {DestinationDto} from "../../assets/utils/DestinationDto";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, getDestinations, RootState, setSearchOption} from "../../../store";

const Catalog = () => {
    const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

    const {
        destination,
        searchOptions,
        status
    } = useSelector((state: RootState) => state.destinationReducer);

    const dispatch = useDispatch<AppDispatch>();

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
            await dispatch(getDestinations(searchOptions));
        } catch (e) {
            alert("This entity exist")
        }
    };

    useEffect(() => {
        dispatch(getDestinations(searchOptions));
    }, [dispatch, searchOptions]);

    const deleteDestination = async (id: string) => {
        await DestinationServices.deleteDestination(id);
        await dispatch(getDestinations(searchOptions));
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
        await dispatch(getDestinations(searchOptions));
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
            <Menu onCreateModal={handleCreateModal}/>
            {createModal && <CreateModal onClose={handleCloseCreateModal} onCreate={createDestination} />}
            {updateModal && selectedDestination && (
                <UpdateModal
                    onClose={handleCloseUpdateModal}
                    onUpdate={updateDestination}
                    destination={selectedDestination}
                />
            )}
            <CatalogSection onDelete={deleteDestination} onUpdateModal={handleUpdateModal} filteredDestinations={destination || []}/>
        </div>
    );
};

export default Catalog;