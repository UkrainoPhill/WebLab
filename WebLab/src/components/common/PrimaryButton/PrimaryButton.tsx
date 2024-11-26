import React from 'react';
import './PrimaryButton.css';
import {Link} from "react-router-dom";


interface PrimaryButtonProps {
    link: string;
    name: string;
}

const PrimaryButton : React.FC<PrimaryButtonProps> = (props ) => {
    return (
        <Link className={"primaryButton"} to={props.link}>{props.name}</Link>
    );
};

export default PrimaryButton;