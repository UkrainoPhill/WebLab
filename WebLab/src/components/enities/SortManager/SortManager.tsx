import React, {FC} from 'react';
import Select from "../../common/Select/Select";
import './SortManager.css'


interface SortManagerProps{
    setSearchOptions: React.Dispatch<React.SetStateAction<{ search?: string, sort?: string, price?: number, rate?: number, continent?: number, id?: string }>>;
}

const SortManager: FC<SortManagerProps> = (props) => {
    const sort: Array<[string, string]> = [
        ["Price (0-99+)", "price_asc"],
        ["Price (99+-0)", "price_desc"],
        ["Name (A-Z)", "title_asc"],
        ["Name (Z-A)", "title_desc"]
    ];    return (
        <div className="sort-div">
            <h1>Manage Destinations</h1>
            <form>
                <label htmlFor="sort"> Sort by: </label>
                <Select name={"Choose one..."} options={sort} onChange={e => { props.setSearchOptions(prevState => ({
                    ...prevState,
                    sort: (e.target.value === "undefined") ? '' : e.target.value,
                }));}}/>
            </form>
        </div>
    );
};

export default SortManager;