import React from 'react';
import Header from '../components/Header';
import Notification from '../components/Notification';
import { logOut } from '../services/LogoutService';
import styles from './HomeCont.module.css';

export default function HomeCont(props) {

    return (
        <div className={styles.container}>
            <Header logOut={logOut} props={props} />
            <h1>Obavijesti</h1>
            <Notification />
            <Notification />
            <Notification />
            <Notification />
            <Notification />
        </div>
    );

}