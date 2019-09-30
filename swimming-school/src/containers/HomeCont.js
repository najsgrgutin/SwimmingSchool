import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import NotificationCont from '../containers/NotificationCont';
import { getNotifications } from '../services/NotificationService';
import { logOut } from '../services/LogoutService';
import styles from './HomeCont.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

export default function HomeCont(props) {

    const [notifications, setNotifications] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        getNotifications(token)
            .then((notification) => setNotifications(notification.reverse()))
    }, []);

    return (
        <div className={styles.container}>
            <Header logOut={logOut} props={props} />
            <div className={styles.titleContainer}>  
                <div className={styles.title}>Obavijesti</div>
                <FontAwesomeIcon className={styles.addIcon} icon={faPlusCircle} />
            </div>
            {notifications ? 
                notifications.map((notification) => <NotificationCont key={notification.id} details={notification} props={props} />)
                :
                null
            }
        </div>
    );

}