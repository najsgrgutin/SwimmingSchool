import React from 'react';
import { getTime, getDate } from '../services/DateFormatService';
import styles from './Notification.module.css';

export default function Notification({ details, onNotificationClick }) {

    return (
        <div className={styles.notificationContainer} onClick={onNotificationClick}>
            <div className={styles.notificationTitle}>{details.title}</div>
            <div className={styles.notificationDate}>{getTime(details.created)} {getDate(details.created)}</div>
            <div className={styles.notificationAuthor}>{details.created_by.username}</div>
        </div>
    );

}