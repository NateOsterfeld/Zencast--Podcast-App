import React from 'react';
import './CustomButton.scss';

/* children would usually include elements, but in this case it's just the innerText e.g. 'Sign-in' */
const CustomButton = ({ children, isGoogleSignIn, ...otherProps }) => (
    <button className={`${isGoogleSignIn ? 'google-sign-in ' : ''} custom-button`} {...otherProps}>
        {children}
    </button>
)

export default CustomButton;
