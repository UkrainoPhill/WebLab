import React from 'react';
import './Select.css';

interface SelectProps {
    name: string,
    options: Array<string>,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select: React.FC<SelectProps> = (props) => {
    return (
        <select className={"select"} defaultValue="" onChange={props.onChange}>
            <option value="" >{props.name}</option>
            {props.options.map((value, index) => (
                <option key={index} value={value}>{value}</option>
            ))}
        </select>
    );
};

export default Select;