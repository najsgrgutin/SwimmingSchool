import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { AppContext } from '../state/AppContext';
import { Notification } from '../components/Notification';
import { deleteNotification } from '../services/NotificationService';
import { tokenService } from '../services/TokenService';

function NotificationContainer({ details, props }) {

    const { appState } = useContext(AppContext);

    const [decoded] = tokenService();

    function onNotificationClick() {
        props.history.push(`/home/notification/${details.id}`)
    }

    function onDeleteNotificationClick(event) {
        event.stopPropagation();
        deleteNotification(localStorage.getItem('token'), details.id, appState.notifications)
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

export const NotificationCont = observer(NotificationContainer)