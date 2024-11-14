import React, {FC} from 'react';
import SearchInput from "../../common/SearchInput/SearchInput";
import './SearchButtons.css';

const SearchButtons: FC = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }
    return (
        <div className="search-menu" id="search-menu">
            <form onSubmit={handleSubmit}>
                <label className="input-buttons-menu">
                    <SearchInput/>
                </label>
            </form>
        </div>
    );
};

export default SearchButtons;