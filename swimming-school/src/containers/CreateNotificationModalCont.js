import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { AppContext } from '../state/AppContext';
import { createNotification } from '../services/NotificationService';
import { CreateNotificationModal } from '../components/CreateNotificationModal';

function CreateNotificationModalContainer(props) {

    const { appState } = useContext(AppContext);

    function goBack() {
        props.history.replace(props.history.push('/home'));
    }

    function stopPropagation(event) {
        event.stopPropagation();
    }

    function handleNotificationCreate(data) {
        const token = localStorage.getItem('token');
        const notificationData = {
            'title': data.notification.title,
            'description': data.notification.description,
        };
        createNotification(notificationData, token, appState.notifications)
            .then(props.history.push('/home'))
            .catch((error) => console.log(error));;
    }

    return (
        <CreateNotificationModal
            goBack={goBack}
            stopPropagation={stopPropagation}
            handleNotificationCreate={handleNotificationCreate}
        />
    );

}

export const CreateNotificationModalCont = observer(CreateNotificationModalContainer);