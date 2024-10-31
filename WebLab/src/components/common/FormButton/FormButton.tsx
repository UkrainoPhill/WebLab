import React from 'react';
import './FormButton.css'

interface FormButtonProps{
    name: string,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const FormButton : React.FC<FormButtonProps> = (props) => {
    return (
        <button className="formButton" onClick={props.onClick || (() => {
        })}>
            {props.name}
        </button>);
};

export default FormButton;