import React from 'react';
import './SecondaryButton.css';
import {Link} from "react-router-dom";

interface SecondaryButtonProps {
    link: string;
    name: string;
}

const SecondaryButton : React.FC<SecondaryButtonProps> = (props) => {
    return (
        <Link className={"secondaryButton"} to={props.link}>{props.name}</Link>
    );
};

export default SecondaryButton;