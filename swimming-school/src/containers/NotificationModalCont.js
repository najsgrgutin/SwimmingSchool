import React, { useState, useEffect } from 'react';
import NotificationModal from '../components/NotificationModal';
import { getNotification } from '../services/NotificationService';

export default function NotificationModalCont(props) {

    const [notification, setNotification] = useState('');

    function goBack() {
        props.history.replace(props.history.push('/home'));
    }

    function stopPropagation(event) {
        event.stopPropagation();
    }

    useEffect(() =>  {
        const token =  localStorage.getItem('token');
        getNotification(token, props.match.params.id)
            .then((response) => setNotification(response));
    }, [props.match.params.id]);

    return (
        <NotificationModal 
            goBack={goBack}
            stopPropagation={stopPropagation}
            details={notification}
        />
    );

}