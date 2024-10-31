import React, {FC} from 'react';
import './RemoveItemButton.css';

interface RemoveItemButtonProps{
    name: string,
    id: string,
    onDelete: (id: string) => void;
}

const RemoveItemButton : FC<RemoveItemButtonProps> = (props) => {
    const deleteItem = () => {
        props.onDelete(props.id);
    };
    return (
        <button className="remove-item" onClick={deleteItem}>{props.name}</button>
    );
};

export default RemoveItemButton;