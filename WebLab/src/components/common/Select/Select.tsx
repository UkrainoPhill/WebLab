import React from 'react';
import './Select.css';

interface SelectProps {
    name: string,
    options: Array<[string, string | number]>,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select: React.FC<SelectProps> = (props) => {
    return (
        <select className={"select"} onChange={props.onChange}>
            <option value={"undefined"}>{props.name}</option>
            {props.options.map((value, index) => (
                <option key={index} value={value[1]}>{value[0]}</option>
            ))}
        </select>
    );
};

export default Select;