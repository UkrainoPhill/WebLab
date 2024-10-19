import React, {FC} from 'react';
import './SearchButton.css';

interface SearchButtonProps{
    name: string,
}

const SearchButton : FC<SearchButtonProps> = (props) => {
    return (
        <button type="submit" className="search" id="button_search">{props.name}</button>
    );
};

export default SearchButton;