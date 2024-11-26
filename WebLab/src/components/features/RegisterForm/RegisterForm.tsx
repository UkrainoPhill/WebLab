import React from 'react';
import './RegisterForm.css';
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import ErrorForm from "../ErrorForm/FormError";
import {Link, useNavigate} from "react-router-dom";
import {AppDispatch, login} from "../../../store";
import {useDispatch} from "react-redux";
import AuthService from "../../../services/UserService";
import {RegisterInputDto} from "../../assets/utils/RegisterInputDto";
import {unwrapResult} from "@reduxjs/toolkit";

const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const checkoutSchema = Yup.object().shape({
        username: Yup.string()
            .min(2, 'Too Short username!')
            .max(50, 'Too Long username!')
            .required('Required username'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required email'),
        password: Yup.string()
            .min(8, 'Too Short password!')
            .max(50, 'Too Long password!')
            .required('Required password'),
    });

    const handleSubmit = async (values : {username: string, email: string, password: string}) => {
        const registerInputDto : RegisterInputDto = {
            username: values.username,
            password: values.password,
            email: values.email,
        }
        await AuthService.register(registerInputDto);
        const {email, ...loginInputDto} = registerInputDto;
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
                resetForm();
                handleSubmit(values).then();
            }}>
            {({errors, touched}) => (
                <Form className={"register-form"}>
                    <div className={'form-field'}>
                        <label htmlFor="username">Username</label>
                        <Field name="username" type="text"/>
                        {errors.username && touched.username && <ErrorForm message={errors.username}/>}
                    </div>
                    <div className={'form-field'}>
                        <label htmlFor="email">Email</label>
                        <Field name="email" type="email"/>
                        {errors.email && touched.email && <ErrorForm message={errors.email}/>}
                    </div>
                    <div className={'form-field'}>
                        <label htmlFor="password">Password</label>
                        <Field name="password" type="password"/>
                        {errors.password && touched.password && <ErrorForm message={errors.password}/>}
                    </div>
                    <button type="submit" className={'submit-button'}>Register</button>
                    <p>If you have already register press this <Link to={'/login'}>link</Link></p>
                </Form>
            )}
        </Formik>
    );
};

export default RegisterForm;