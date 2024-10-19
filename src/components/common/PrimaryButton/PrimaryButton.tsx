import React from 'react';
import './PrimaryButton.css';


interface PrimaryButtonProps {
    link: string;
    name: string;
}

const PrimaryButton : React.FC<PrimaryButtonProps> = (props ) => {
    return (
        <a className={"primaryButton"} href={props.link}>{props.name}</a>
    );
};

export default PrimaryButton;