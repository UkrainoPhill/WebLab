import React, { useState } from 'react';
import Select from "../../common/Select/Select";
import './FilterManager.css';

interface FilterManagerProps {
    onFilterChange: (filters: { continent: string, rate: number, price: number }) => void;
}

const FilterManager: React.FC<FilterManagerProps> = ({ onFilterChange }) => {
    const [continent, setContinent] = useState('');
    const [rate, setRate] = useState(0);
    const [price, setPrice] = useState(0);

    const handleFilterChange = () => {
        onFilterChange({ continent, rate, price });
    };

    return (
        <div>
            <form className={'filter-manager'}>
                <label>Filters: </label>
                <Select
                    name={"Continents"}
                    options={["Asia", "Europe", "Africa", "North America", "South America", "Antarctica", "Australia"]}
                    onChange={(e) => { setContinent(e.target.value); handleFilterChange(); }}
                />
                <Select
                    name={"Rate"}
                    options={["1", "2", "3", "4", "5"]}
                    onChange={(e) => { setRate(parseInt(e.target.value)); handleFilterChange(); }}
                />
                <Select
                    name={"Price"}
                    options={["0-500", "500-1000", "1000-1500", "1500-2000", "2000+"]}
                    onChange={(e) => { setPrice(parseInt(e.target.value)); handleFilterChange(); }}
                />
            </form>
        </div>
    );
};

export default FilterManager;