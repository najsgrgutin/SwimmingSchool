import React from 'react';
import { observer } from 'mobx-react';
import styles from './UserCard.module.css';
import lights from '../images/lights.jpg';

function UserCardComponent() {

    return (
        <div className={styles.flightCardContainer}>
            <div className={styles.imageContainer}>
                {<img src={lights} alt='Lights' />}
            </div>
            <div style={{ borderTop: '1px solid black' }}></div>
            <div className={styles.infoContainer}>
                <div className={styles.name}><b>Matej Jurić</b></div>
                <div className={styles.date} ><b>01.04.1998</b></div>
            </div>
        </div>
    );
}


export const UserCard = observer(UserCardComponent);


