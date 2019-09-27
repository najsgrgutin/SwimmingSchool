import React from 'react';
import styles from './WelcomePage.module.css';

export default function WelcomePage(props) {

    function onLoginClick() {
        props.history.push('/login');
    }

    function onRegistrationClick() {
        props.history.push('/registration');
    }

    return (
        <div className={styles.welcomeContainer}>
            <div className={styles.emptyHeader}>
            </div>
            <div className={styles.titleContainer}>
               <span className={styles.title}>Dobrodošli u plivački klub ZPK</span>
            </div>
            <div className={styles.buttonsContainer}>
                <button className={styles.button} onClick={onLoginClick}>Login</button>
                <button className={styles.button} onClick={onRegistrationClick}>Registration</button>
            </div>
        </div>
    );

}