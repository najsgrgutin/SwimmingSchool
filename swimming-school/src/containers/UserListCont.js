import React from 'react';
import { observer } from 'mobx-react';
import { UserCard } from '../components/UserCard';
import { Header } from '../components/Header';
import { logOut } from '../services/LogoutService';
import styles from './UserListCont.module.css';

function UserListContainer(props) {

  const polje = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

  return (
    <div className={styles.screen}>
      <Header logOut={logOut} props={props} />
        <div className={styles.main}>
          {
            polje.map(
              (user) => <UserCard key={user} />
            )
          }
        </div>
    </div>
  );

}


export const UserListCont = observer(UserListContainer);