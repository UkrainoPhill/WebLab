import React from 'react';
import './HolidayFinder.css';
import Select from "../../common/Select/Select";
import FormButton from "../../common/FormButton/FormButton";

const HolidayFinder = () => {
    const options: [string, string][] = [
        ["option1", "option1"],
        ["option2", "option2"],
        ["option3", "option3"],
        ["option4", "option4"]
    ];
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }
    return (
        <form onSubmit={handleSubmit}>
            <label className={"holidayFinder"}>
                <Select name={"Location"} options={options} onChange={e => {}}/>
                <Select name={"Activity"} options={options} onChange={e => {}}/>
                <Select name={"Grade"} options={options} onChange={e => {}}/>
                <Select name={"Date"} options={options} onChange={e => {}}/>
            </label>
            <FormButton name={"Explore"}/>
        </form>
    );
};

export default HolidayFinder;