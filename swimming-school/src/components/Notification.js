import React from 'react';
import styles from './Notification.module.css';

export default function Notification() {

    return (
        <div className={styles.notificationContainer}>
            <div className={styles.notificationTitle}>Trening ce se odrzati u petak u 20:00 sati. Budite točni ili se spremite suociti s posljedicama, smrtnim.</div>
            <div className={styles.notificationDate}>Datum i vrijeme</div>
            <div className={styles.notificationAuthor}>Autor</div>
        </div>
    );

}