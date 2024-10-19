import React from 'react';
import CountButton from "../../common/CountButton/CountButton";
import './CountManager.css'

const CountManager = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }
    return (
        <div className="count-div">
            <h1>Count price</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <CountButton name={"Count"}/>
                    <output>Total: <span></span></output>
                </label>
            </form>
        </div>
    );
};

export default CountManager;