import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';

interface ErrorMessageProps {
    children: ReactNode;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ children }) => {
    return <div className="error-message">{children}</div>;
};

ErrorMessage.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ErrorMessage;