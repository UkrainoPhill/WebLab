import React from 'react';
import Select from "../../common/Select/Select";
import './FilterManager.css';
import {AppDispatch, RootState, setSearchOption} from "../../../store";
import {useDispatch, useSelector} from "react-redux";

const FilterManager: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {searchOptions} = useSelector((state: RootState) => state.destinationReducer);
    return (
        <div>
            <form className={'filter-manager'}>
                <label>Filters: </label>
                <Select
                    name={"Continents"}
                    options={[
                        ["Asia", 1],
                        ["Europe", 2],
                        ["Africa", 0],
                        ["North America", 3],
                        ["South America", 4],
                        ["Antarctica", 6],
                        ["Australia", 5]
                    ]}
                    onChange={(e) => {dispatch(setSearchOption({...searchOptions, continent: isNaN(parseInt(e.target.value)) ? undefined : parseInt(e.target.value)}))}}
                />
                <Select
                    name={"Rate"}
                    options={[
                        ["1", 1],
                        ["2", 2],
                        ["3", 3],
                        ["4", 4],
                        ["5", 5]
                    ]}
                    onChange={(e) => {dispatch(setSearchOption({...searchOptions, rate: isNaN(parseInt(e.target.value)) ? undefined : parseInt(e.target.value)}))}}
                />
                <Select
                    name={"Price"}
                    options={[
                        ["500", 500],
                        ["1000", 1000],
                        ["1500", 1500],
                        ["2000", 2000]
                    ]}
                    onChange={(e) => {dispatch(setSearchOption({...searchOptions, price: isNaN(parseInt(e.target.value)) ? undefined : parseInt(e.target.value)}))}}

                />
            </form>
        </div>
    );
};

export default FilterManager;