import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import NotificationCont from '../containers/NotificationCont';
import { getNotifications } from '../services/NotificationService';
import { logOut } from '../services/LogoutService';
import styles from './HomeCont.module.css';

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
            <h1>Obavijesti</h1>
            {notifications ? 
                notifications.map((notification) => <NotificationCont key={notification.id} details={notification} props={props} />)
                :
                null
            }
        </div>
    );

}