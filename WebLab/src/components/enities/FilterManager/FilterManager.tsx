import React from 'react';
import Select from "../../common/Select/Select";
import './FilterManager.css';

interface FilterManagerProps {
    setSearchOptions: React.Dispatch<React.SetStateAction<{ search?: string, sort?: string, price?: number, rate?: number, continent?: number, id?: string }>>;

}

const FilterManager: React.FC<FilterManagerProps> = (props) => {

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
                    onChange={(e) => { props.setSearchOptions(prevState => ({
                        ...prevState,
                        continent: isNaN(parseInt(e.target.value)) ? undefined : parseInt(e.target.value)
                    }));}}
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
                    onChange={(e) => { props.setSearchOptions(prevState => ({
                        ...prevState,
                        rate: isNaN(parseInt(e.target.value)) ? undefined : parseInt(e.target.value)
                    }));}}
                />
                <Select
                    name={"Price"}
                    options={[
                        ["500", 500],
                        ["1000", 1000],
                        ["1500", 1500],
                        ["2000", 2000]
                    ]}
                    onChange={(e) => { props.setSearchOptions(prevState => (
                        {
                        ...prevState,
                        price: isNaN(parseInt(e.target.value)) ? undefined : parseInt(e.target.value)
                    }));}}
                />
            </form>
        </div>
    );
};

export default FilterManager;