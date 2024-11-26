import React from 'react';
import './LoginForm.css';
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import ErrorForm from "../ErrorForm/FormError";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AppDispatch, login} from "../../../store";
import {LoginInputDto} from "../../assets/utils/LoginInputDto";
import {unwrapResult} from "@reduxjs/toolkit";

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const checkoutSchema = Yup.object().shape({
        username: Yup.string()
            .min(2, 'Too Short username!')
            .max(50, 'Too Long username!')
            .required('Required username'),
        password: Yup.string()
            .min(8, 'Too Short password!')
            .max(50, 'Too Long password!')
            .required('Required password'),
    });

    const handleSubmit = async (loginInputDto: LoginInputDto) => {
        try {
            const resultAction = await dispatch(login(loginInputDto));
            const result = unwrapResult(resultAction);
            localStorage.setItem('token', result.data);
            navigate('/');
        } catch (error) {
            alert(error);
        }
    }
    return (
        <Formik
            initialValues={{
                username: '',
                email: '',
                password: ''
            }}
            validationSchema={checkoutSchema}
            onSubmit={(values, { resetForm}) => {
                const loginInputDto: LoginInputDto = {
                    password: values.password,
                    username: values.username,
                }
                handleSubmit(loginInputDto);
            }}>
            {({errors, touched}) => (
                <Form className={"register-form"}>
                    <div className={'form-field'}>
                        <label htmlFor="username">Username</label>
                        <Field name="username" type="text"/>
                        {errors.username && touched.username && <ErrorForm message={errors.username}/>}
                    </div>
                    <div className={'form-field'}>
                        <label htmlFor="password">Password</label>
                        <Field name="password" type="password"/>
                        {errors.password && touched.password && <ErrorForm message={errors.password}/>}
                    </div>
                    <button type="submit" className={'submit-button'}>Login</button>
                    <p>If you have already register press this <Link to={'/register'}>link</Link></p>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;