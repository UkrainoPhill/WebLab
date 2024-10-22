import React, {FC} from 'react';
import './SearchInput.css';
import editItemButton from "../EditItemButton/EditItemButton";

interface SearchInputProps{
    setSearchOptions: React.Dispatch<React.SetStateAction<{ term: string, sort: string, price: number, rating: number, country: string }>>;
}


const SearchInput: FC<SearchInputProps> = (props) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setSearchOptions(prev => ({ ...prev, term: event.target.value }));
    };
    return (
        <input type="text" placeholder="Type something..." className="input_search" onChange={handleChange}/>
    );
};

export default SearchInput;