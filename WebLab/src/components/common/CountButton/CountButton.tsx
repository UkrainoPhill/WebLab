import React, {FC} from 'react';
import './CountButton.css'

interface CountButtonProps{
    name: string
}
const CountButton: FC<CountButtonProps> = (props) => {
    return (
        <button id="button-count" type="submit" className="item-count-button">{props.name}</button>
    );
};

export default CountButton;