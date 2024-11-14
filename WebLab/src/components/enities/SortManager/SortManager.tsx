import React, {FC} from 'react';
import Select from "../../common/Select/Select";
import './SortManager.css'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState, setSearchOption} from "../../../store";


const SortManager: FC = () => {
    const {searchOptions} = useSelector((state: RootState) => state.destinationReducer);
    const dispatch = useDispatch<AppDispatch>();

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSearchOption({ ...searchOptions, sort: e.target.value === "undefined" ? '' : e.target.value }));
    };
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
                <Select name={"Choose one..."} options={sort} onChange={handleSortChange}/>
            </form>
        </div>
    );
};

export default SortManager;