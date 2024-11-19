import React from 'react';
import './SuccessPage.css';
import {useNavigate} from "react-router-dom";

const SuccessPage = () => {
    const navigate = useNavigate();
    return (
        <div className="success-page">
            <div className="success-message">
                <h1>Success!</h1>
                <p>Your order has been placed successfully.</p>
                <button onClick={() => navigate('/')}>Go to Home</button>
            </div>
        </div>
    );
};

export default SuccessPage;