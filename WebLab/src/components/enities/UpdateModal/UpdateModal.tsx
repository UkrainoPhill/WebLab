import React, {FC, useEffect, useState} from 'react';
import './UpdateModal.css';
import {Destination} from "../../assets/utils/Destination";

interface UpdateModalProps {
    onClose: () => void;
    onUpdate: (destination: Destination) => void;
    destination: Destination;
}

const UpdateModal: FC<UpdateModalProps> = ({ onClose, onUpdate, destination }) => {
    const [title, setTitle] = useState(destination.title);
    const [description, setDescription] = useState(destination.description);
    const [price, setPrice] = useState(destination.price);
    const [image, setImage] = useState<File | null>(null);
    const [continent, setContinent] = useState(destination.continent);


    useEffect(() => {
        console.log('UpdateModal destination prop:', destination);
        setTitle(destination.title);
        setDescription(destination.description);
        setPrice(destination.price);
    }, [destination]);

    const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const updatedDestination: Destination = {
            ...destination,
            title,
            description,
            price,
            continent,
            image: image ? URL.createObjectURL(image) : destination.image,
            last_updated: new Date().toISOString()
        };
        onUpdate(updatedDestination);
        onClose();
    };

    return (
        <div>
            <div id="background-modal" className="background-modal" onClick={handleBackgroundClick}></div>
            <div id="edit-modal" className="edit-modal">
                <div className="modal-content">
                    <h1>Edit destination</h1>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Title</span>
                            <input
                                type="text"
                                placeholder="Text..."
                                className="title-create-input"
                                maxLength={25}
                                id="title-edit-modal"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </label>
                        <label>
                            <span>Description</span>
                            <textarea
                                className="description-create-input"
                                id="description-edit-modal"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </label>
                        <label>
                            <span>Price ($)</span>
                            <input
                                id="price-edit-modal"
                                type="number"
                                min="0"
                                placeholder="Number..."
                                className="price-create-input"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                            />
                        </label>
                        <label>
                            <span>Continent</span>
                            <select className={"continent-create-input"} value={continent}
                                    onChange={(e) => setContinent(parseInt(e.target.value))}>
                                <option value={undefined} hidden={true} disabled={true}>Select Continent... </option>
                                <option value={1}>Asia</option>
                                <option value={2}>Europe</option>
                                <option value={0}>Africa</option>
                                <option value={3}>North America</option>
                                <option value={4}>South America</option>
                                <option value={6}>Antarctica</option>
                                <option value={5}>Australia</option>
                            </select>
                        </label>
                        {/*<label>*/}
                        {/*    <input*/}
                        {/*        type="file"*/}
                        {/*        id="image-edit-modal"*/}
                        {/*        accept=".jpg, .jpeg, .png"*/}
                        {/*        onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}*/}
                        {/*    />*/}
                        {/*    <button type="reset">Clear</button>*/}
                        {/*</label>*/}
                        <label>
                            <button className="create-modal-button" type="submit" id="submit-edit-button">Submit
                            </button>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateModal;