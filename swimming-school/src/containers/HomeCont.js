import React, { useState, useEffect, useContext } from 'react';
import { Header } from '../components/Header';
import { NotificationCont } from '../containers/NotificationCont';
import { getNotifications } from '../services/NotificationService';
import { logOut } from '../services/LogoutService';
import { tokenService } from '../services/TokenService';
import styles from './HomeCont.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { AppContext } from '../state/AppContext';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';


function HomeContainer(props) {

    const { appState } = useContext(AppContext);

    const [notifications, setNotifications] = useState('');
    const [decoded, current_time] = tokenService();

    useEffect(() => {
        if (current_time > decoded.exp) {
            props.history.push('/login');
        }
        getNotifications(localStorage.getItem('token'), appState)
            .then((notifications) => setNotifications(notifications.reverse()));
        // eslint-disable-next-line
    }, [/* props.history.location.pathname,  */toJS(appState.notifications).length]);

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


export const HomeCont = observer(HomeContainer);
