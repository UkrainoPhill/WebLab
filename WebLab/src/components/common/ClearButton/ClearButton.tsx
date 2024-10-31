import React, {FC} from 'react';
import './ClearButton.css'

interface ClearButtonProps{
    name: string
}

const ClearButton : FC<ClearButtonProps> = (props) => {
    return (
        <button type="reset" className="clear">{props.name}</button>
    );
};

export default ClearButton;