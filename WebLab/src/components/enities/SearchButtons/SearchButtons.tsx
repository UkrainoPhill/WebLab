import React, {FC} from 'react';
import SearchInput from "../../common/SearchInput/SearchInput";
import './SearchButtons.css';

interface SearchButtonsProps {
    setSearchOptions: React.Dispatch<React.SetStateAction<{ search?: string, sort?: string, price?: number, rate?: number, continent?: number, id?: string }>>;
}


const SearchButtons: FC<SearchButtonsProps> = (props) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }
    return (
        <div className="search-menu" id="search-menu">
            <form onSubmit={handleSubmit}>
                <label className="input-buttons-menu">
                    <SearchInput setSearchOptions={props.setSearchOptions}/>
                </label>
            </form>
        </div>
    );
};

export default SearchButtons;