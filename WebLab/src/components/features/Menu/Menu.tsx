import React from 'react';
import './Menu.css';
import CreateButton from "../../common/CreateButton/CreateButton";
import SearchButtons from "../../enities/SearchButtons/SearchButtons";

interface MenuProps {
    onCreateModal: () => void;
}

const Menu: React.FC<MenuProps> = (props) => {
    return (
        <section className="section-menu">
            <CreateButton name={"Create"} onCreateModal={props.onCreateModal}/>
            <SearchButtons/>
        </section>
    );
};

export default Menu;