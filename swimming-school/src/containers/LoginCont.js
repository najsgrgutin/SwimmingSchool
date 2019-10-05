import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Login } from '../components/Login';
import { loginUser } from '../services/LoginService';

function LoginContainer(props) {

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
            onLoginClick={onLoginClick}
            showError={showError}
        />
    );

}


export const LoginCont = observer(LoginContainer);

