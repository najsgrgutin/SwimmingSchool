import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import NotificationCont from '../containers/NotificationCont';
import { getNotifications } from '../services/NotificationService';
import { logOut } from '../services/LogoutService';
import styles from './HomeCont.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import jwt_decode from 'jwt-decode';


export default function HomeCont(props) {

    const [notifications, setNotifications] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const decoded = jwt_decode(token);
        
        var current_time = new Date().getTime() / 1000;
        if (current_time > decoded.exp) {
            props.history.push('/login');
        } // ode se u else dosa cesto ispisuje probaj to nekako rjesiti 

        getNotifications(token)
            .then((notification) => setNotifications(notification.reverse()))
    });

    function onCreateNotificationClick() {
        props.history.push('/home/create');
    }


    return (
        <div className={styles.container}>
            <Header logOut={logOut} props={props} />
            <div className={styles.titleContainer}>  
                <div className={styles.title}>Obavijesti</div>
                <FontAwesomeIcon className={styles.addIcon} icon={faPlusCircle} onClick={onCreateNotificationClick} />
            </div>
            {notifications ? 
                notifications.map((notification) => <NotificationCont key={notification.id} details={notification} props={props} />)
                :
                null
            }
        </div>
    );

}