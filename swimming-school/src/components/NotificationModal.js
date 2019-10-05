import React from 'react';
import { observer } from 'mobx-react';
import { getTime, getDate } from '../services/DateFormatService';
import styles from './NotificationModal.module.css';

function NotificationModalComponent({ goBack, stopPropagation, details }) {

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

export const NotificationModal = observer(NotificationModalComponent);