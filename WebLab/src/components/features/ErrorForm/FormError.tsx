import React from 'react';

interface FormErrorProps {
    message: string;
}

const FormError: React.FC<FormErrorProps> = (props) => {
    return <div className="error-message">{props.message}</div>;
};

export default FormError;