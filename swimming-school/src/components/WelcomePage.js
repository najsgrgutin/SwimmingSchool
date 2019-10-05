import React from 'react';
import { observer } from 'mobx-react';
import styles from './WelcomePage.module.css';
import logo from '../images/logo.jpg';

function WelcomePageComponent(props) {

    function onLoginClick() {
        props.history.push('/login');
    }

    function onRegistrationClick() {
        props.history.push('/registration');
    }

    return (
        <div className={styles.welcomeContainer}>
            <div className={styles.emptyHeader}></div>
            <img className={styles.logoImage} src={logo} alt='logo' />
            <span className={styles.description}>
                Dobro došli na stranicu plivačke škole Zagrebačkog plivačkog kluba
            </span>
            <div className={styles.buttonsContainer}>
                <button className={styles.button} onClick={onLoginClick}>Login</button>
                <button className={styles.button} onClick={onRegistrationClick}>Registration</button>
            </div>
        </div>
    );

}

export const WelcomePage = observer(WelcomePageComponent);