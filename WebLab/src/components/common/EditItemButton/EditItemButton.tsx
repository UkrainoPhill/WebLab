import React, {FC} from 'react';
import './EditItemButton.css';
import {Destination} from "../../assets/utils/Destination";

interface EditItemButtonProps {
    name: string;
    onUpdateModal: (destination: Destination) => void;
    destination: Destination;
}

const EditItemButton: FC<EditItemButtonProps> = (props) => {
    return (
        <button className="edit-item" id="button-edit" onClick={() => props.onUpdateModal(props.destination)}>
            {props.name}
        </button>
    );
};

export default EditItemButton;