import React from 'react';
import { getTime, getDate } from '../services/DateFormatService';
import styles from './NotificationModal.module.css';

export default function NotificationModal({ goBack, stopPropagation, details }) {

    return (
            <div className={styles.screen} onClick={goBack}>
                {details ? 
                    <div className={styles.modalContainer} onClick={stopPropagation}>
                        <div className={styles.title}>{details.title}</div>
                        <div>{details.description}</div>
                        <div>{getTime(details.created)} {getDate(details.created)}</div>
                        <div>{details.created_by.username}</div>
                    </div>
                    :
                    null
                }
            </div>
    );

}