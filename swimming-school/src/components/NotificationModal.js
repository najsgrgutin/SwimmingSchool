import React, { useEffect } from 'react';
import { getTime, getDate } from '../services/DateFormatService';
import styles from './NotificationModal.module.css';

export default function NotificationModal({ goBack, stopPropagation, details }) {

    useEffect(() => {
    }, [details.created]);

    return (
            <div className={styles.screen} onClick={goBack}>
                {details ? 
                    <div className={styles.modalContainer} onClick={stopPropagation}>
                        <div className={styles.title}>{details.title}</div>
                        <div className={styles.description}>{details.description}</div>
                        <div className={styles.userDateContainer}>
                            <div>{details.created_by.username}</div>
                            <div>{getTime(details.created)} {getDate(details.created)}</div>
                        </div>
                    </div>
                    :
                    null
                }
            </div>
    );

}