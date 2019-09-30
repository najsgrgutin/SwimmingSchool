import React from 'react';
import styles from './Header.module.css';
import logo from '../images/logo.jpeg';

export default function Header({ logOut, props }) {

    return (
        <div className={styles.header}>
            <div className={styles.logoGroupContainer}>
                <img src={logo} alt='logo' className={styles.logo} />
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