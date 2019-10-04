import React from 'react';
import Notification from '../components/Notification';
import { deleteNotification } from '../services/NotificationService';
import { tokenService } from '../services/TokenService';

export default function NotificationCont({ details, props }) {

    const [decoded] = tokenService();

    function onNotificationClick() {
        props.history.push(`/home/notification/${details.id}`)
    }

    function onDeleteNotificationClick(event) {
        event.stopPropagation();
        deleteNotification(localStorage.getItem('token'), details.id)
            .then(alert('Notification deleted'));
    }

    return (
        <Notification 
            details={details}
            onDeleteNotificationClick={onDeleteNotificationClick}
            onNotificationClick={onNotificationClick}
            isStaff={decoded.staff}
        />
    );

}