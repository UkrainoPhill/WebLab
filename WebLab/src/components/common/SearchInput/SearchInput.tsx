import React, {FC} from 'react';
import './SearchInput.css';

interface SearchInputProps{
    setSearchOptions: React.Dispatch<React.SetStateAction<{ search?: string, sort?: string, price?: number, rate?: number, continent?: number, id?: string }>>;
}


const SearchInput: FC<SearchInputProps> = (props) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setSearchOptions(prev => ({ ...prev, search: event.target.value }));
    };
    return (
        <input type="text" placeholder="Type something..." className="input_search" onChange={handleChange}/>
    );
};

export default SearchInput;