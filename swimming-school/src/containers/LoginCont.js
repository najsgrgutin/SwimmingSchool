import React, { useState } from 'react';
import Login from '../components/Login';
import { loginUser } from '../services/LoginService';

function LoginCont(props) {

    const [showError, setShowError] = useState('');

    function onLoginClick(data) {
        const loginData = {
            'username': data.user.username,
            'password': data.user.password,
        };
        loginUser(loginData, props)
            .catch((error) => setShowError(error));
    }

    return (
        <Login
            onLoginFunc={onLoginClick}
            showError={showError}
        />
    );

}


export default LoginCont;

