import React from 'react';
import './FormButton.css'

interface FormButtonProps{
    name: string,
}

const FormButton : React.FC<FormButtonProps> = (props) => {
    return (
        <button className="formButton">{props.name}</button>
    );
};

export default FormButton;