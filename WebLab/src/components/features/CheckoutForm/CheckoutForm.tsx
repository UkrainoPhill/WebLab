import React from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import './CheckoutForm.css';
import ErrorMessage from '../ErrorForm/ErrorForm';
import {useNavigate} from "react-router-dom";

const ErrorMessageWrapper = (props: any) =>
    <ErrorMessage>{props.children}</ErrorMessage>;

const CheckoutPage = () => {
    const navigate = useNavigate();
    const validationSchema = Yup.object({
        firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('First name is required'),
        lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Last name is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        phoneNumber: Yup.string()
            .matches(/^[0-9]+$/, 'Must be only digits')
            .min(10, 'Must be exactly 10 digits')
            .max(10, 'Must be exactly 10 digits')
            .required('Phone number is required'),
        address: Yup.string()
            .required('Address is required'),
    });

    const handleSubmit = (values: { firstName: string; lastName: string; email: string; phoneNumber: string; address: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        console.log('Form values:', values);
        setSubmitting(false);
        navigate('/success')
    };

    return (
        <div className="checkout-page">
            <h2>Checkout</h2>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    address: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className={'checkout-form'}>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <Field name="firstName" type="text" />
                            <FormikErrorMessage name="firstName" component={ErrorMessageWrapper} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <Field name="lastName" type="text" />
                            <FormikErrorMessage name="lastName" component={ErrorMessageWrapper} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field name="email" type="email" />
                            <FormikErrorMessage name="email" component={ErrorMessageWrapper} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <Field name="phoneNumber" type="text" />
                            <FormikErrorMessage name="phoneNumber" component={ErrorMessageWrapper} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <Field name="address" type="text" />
                            <FormikErrorMessage name="address" component={ErrorMessageWrapper} />
                        </div>
                        <button type="submit" disabled={isSubmitting}>Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CheckoutPage;