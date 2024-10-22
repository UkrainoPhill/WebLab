import React, {FC} from 'react';
import SearchButton from "../../common/SearchButton/SearchButton";
import ClearButton from "../../common/ClearButton/ClearButton";
import SearchInput from "../../common/SearchInput/SearchInput";
import './SearchButtons.css';

interface SearchButtonsProps {
    setSearchOptions: React.Dispatch<React.SetStateAction<{ term: string, sort: string, price: number, rating: number, country: string }>>;
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
                    {/*<label className="search-buttons-menu">*/}
                    {/*    <SearchButton name={"Search"}/>*/}
                    {/*    <ClearButton name={"Clear"}/>*/}
                    {/*</label>*/}
                </label>
            </form>
        </div>
    );
};

export default SearchButtons;