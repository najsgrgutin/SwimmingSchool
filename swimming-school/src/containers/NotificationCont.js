import React from 'react';
import Notification from '../components/Notification';

export default function NotificationCont({ details, props }) {

    function onNotificationClick() {
        props.history.push(`/home/notification/${details.id}`)
    }

    return (
        <Notification 
            details={details}
            onNotificationClick={onNotificationClick}
        />
    );

}