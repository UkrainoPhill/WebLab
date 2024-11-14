import React, {FC} from 'react';
import './SearchInput.css';
import {AppDispatch, RootState, setSearchOption} from "../../../store";
import {useDispatch, useSelector} from "react-redux";


const SearchInput: FC = (props) => {
    const dispatch = useDispatch<AppDispatch>();
    const {searchOptions} = useSelector((state: RootState) => state.destinationReducer);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchOption({...searchOptions, search: event.target.value }))
    };
    return (
        <input type="text" placeholder="Type something..." className="input_search" onChange={handleChange}/>
    );
};

export default SearchInput;