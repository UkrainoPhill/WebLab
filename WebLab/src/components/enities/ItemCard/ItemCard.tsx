import './ItemCard.css';
import React, {FC} from 'react';
import {Destination} from "../../assets/utils/Destination";
import EditItemButton from "../../common/EditItemButton/EditItemButton";
import RemoveItemButton from "../../common/RemoveItemButton/RemoveItemButton";
import {Link} from "react-router-dom";

interface ItemCardProps{
    destination: Destination,
    onDelete: (id: string) => void;
    onUpdateModal: (destination: Destination) => void;
}

const ItemCard : FC<ItemCardProps> = (props) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }
    return (
        <div className="item">
            <div>
                <Link to={`/catalog/${props.destination.id}`}><img src={props.destination.image} alt="item-img" id="item-image"/></Link>
                <div className="item-info">
                    <p className="id">{props.destination.id}</p>
                    <h1>{props.destination.title}</h1>
                    <p>{props.destination.description}</p>
                    <p><span>{props.destination.price}</span>$</p>
                    <p className="item-updated-at">Last updated:<span>{props.destination.last_updated.slice(0, 10)}</span></p>
                </div>
            </div>
            <div className="item-buttons">
                <form onSubmit={handleSubmit}>
                    <label>
                        <EditItemButton name={"Edit"} onUpdateModal={() => props.onUpdateModal(props.destination)} destination={props.destination}/>
                        <RemoveItemButton name={"Delete"} id={props.destination.id} onDelete={props.onDelete}/>
                    </label>
                </form>
            </div>
        </div>
    );
};

export default ItemCard;