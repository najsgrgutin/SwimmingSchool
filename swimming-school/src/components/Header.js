import React from 'react';
import styles from './Header.module.css';

export default function Header({ logOut, props }) {

    return (
        <div className={styles.header}>
            <select className={styles.groupSelect}>
                <option>Grupa 1</option>
                <option>Grupa 2</option>
                <option>Grupa 3</option>
            </select>
            <button className={styles.logoutButton} onClick={logOut.bind(null, props)}>Odjava</button>
        </div>
    );

}