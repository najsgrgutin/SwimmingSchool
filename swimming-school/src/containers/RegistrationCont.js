import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { registerUser } from '../services/RegistrationService';
import { Registration } from '../components/Registration';

function RegistrationContainer(props) {

    const [showError, setShowError] = useState('');

    function onRegisterClick(data) {
        const registrationData = {
            "email": data.email,
            "username": data.username,
            "password": data.password,
        }
        registerUser(registrationData, props)
            .catch((error) => setShowError(error));
    };

    return (
        <Registration 
            onRegisterFunc={onRegisterClick}
            showError={showError}
        />
    );

}

export const RegistrationCont = observer(RegistrationContainer)



