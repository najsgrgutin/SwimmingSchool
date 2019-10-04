import React from 'react';
import CreateNotificationModal from '../components/CreateNotificationModal';

export default function CreateNotificationModalCont(props) {

    function goBack() {
        props.history.replace(props.history.push('/home'));
    }

    function stopPropagation(event) {
        event.stopPropagation();
    }

    return (
        <CreateNotificationModal
            goBack={goBack}
            stopPropagation={stopPropagation}
        />
    );

}