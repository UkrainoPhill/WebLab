import React from 'react';
import './SecondaryButton.css';

interface SecondaryButtonProps {
    link: string;
    name: string;
}

const SecondaryButton : React.FC<SecondaryButtonProps> = (props) => {
    return (
        <a className={"secondaryButton"} href={props.link}>{props.name}</a>
    );
};

export default SecondaryButton;