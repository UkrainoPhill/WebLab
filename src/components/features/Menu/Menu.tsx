import React, {useState} from 'react';
import './Menu.css';
import CreateButton from "../../common/CreateButton/CreateButton";
import SearchButtons from "../../enities/SearchButtons/SearchButtons";

interface MenuProps {
    onCreateModal: () => void;
    setSearchOptions: React.Dispatch<React.SetStateAction<{ term: string, sort: string, price: number, rating: number, country: string }>>;
}

const Menu: React.FC<MenuProps> = (props) => {
    return (
        <section className="section-menu">
            <CreateButton name={"Create"} onCreateModal={props.onCreateModal}/>
            <SearchButtons setSearchOptions={props.setSearchOptions}/>
        </section>
    );
};

export default Menu;