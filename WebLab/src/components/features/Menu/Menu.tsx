import React from 'react';
import './Menu.css';
import CreateButton from "../../common/CreateButton/CreateButton";
import SearchButtons from "../../enities/SearchButtons/SearchButtons";

interface MenuProps {
    onCreateModal: () => void;
    setSearchOptions: React.Dispatch<React.SetStateAction<{ search?: string, sort?: string, price?: number, rate?: number, continent?: number, id?: string }>>;
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