import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import NotificationCont from '../containers/NotificationCont';
import { getNotifications } from '../services/NotificationService';
import { logOut } from '../services/LogoutService';
import { tokenService } from '../services/TokenService';
import styles from './HomeCont.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';


export default function HomeCont(props) {

    const [notifications, setNotifications] = useState('');
    const [decoded, current_time] = tokenService();

    useEffect(() => {
        if (current_time > decoded.exp)
            props.history.push('/login');
        else if (!notifications) {
            getNotifications(localStorage.getItem('token'))
                .then((notification) => setNotifications(notification.reverse()));
        } // eslint-disable-next-line
    }, [props.history.location.pathname]);

    function onCreateNotificationClick() {
        props.history.push('/home/create');
    }

    return (
        <div className={styles.container}>
            <Header logOut={logOut} props={props} />
            <div className={styles.titleContainer}>  
                <div className={styles.title}>Obavijesti</div>
                {decoded.staff && <FontAwesomeIcon className={styles.addIcon} icon={faPlusCircle} onClick={onCreateNotificationClick} />}
            </div>
            {notifications ? 
                notifications.map((notification) => <NotificationCont key={notification.id} details={notification} props={props} />)
                :
                null
            }
        </div>
    );

}