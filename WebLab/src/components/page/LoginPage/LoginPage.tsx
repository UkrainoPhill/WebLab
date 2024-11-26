import React from 'react';
import './LoginPage.css';
import LoginForm from "../../features/LoginForm/LoginForm";

const LoginPage = () => {
    return (
        <div className={"register-page"}>
            <h1>Login</h1>
            <LoginForm/>
        </div>
    );
};

export default LoginPage;