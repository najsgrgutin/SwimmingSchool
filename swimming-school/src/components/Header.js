import React from 'react';
import { observer } from 'mobx-react';
import styles from './Header.module.css';
import logo from '../images/logo.jpg';

function HeaderComponent({ logOut, props }) {

    function onHomeClick() {
        props.history.push('/home');
    }

    return (
        <div className={styles.header}>
            <div className={styles.logoGroupContainer}>
                <img src={logo} alt='logo' className={styles.logo} onClick={onHomeClick} />
                <select className={styles.groupSelect}>
                    <option>Grupa 1</option>
                    <option>Grupa 2</option>
                    <option>Grupa 3</option>
                </select>
            </div>
            <button className={styles.logoutButton} onClick={logOut.bind(null, props)}>Odjava</button>
        </div>
    );

}



export const Header = observer(HeaderComponent);