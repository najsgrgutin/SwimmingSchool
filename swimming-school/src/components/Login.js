import React from 'react';
import useForm from 'react-hook-form';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import styles from './Login.module.css';

function LoginComponent({ onLoginClick, showError }) {

    const { register, handleSubmit } = useForm();

    return (
        <form className={styles.loginContainer} onSubmit={handleSubmit(onLoginClick)}>
            <h1 className={styles.loginTitle}>Login</h1>
            <input 
                className={styles.loginInput} 
                placeholder='Username'
                name='user.username'
                ref={register({
                    required: true
                })}
            />
            <input 
                className={styles.loginInput}
                placeholder='Password'
                name='user.password'
                type='password'
                ref={register({
                    required: true,
                })}
            />
            <button className={styles.loginButton} type='submit'>Login</button>
            <span className={styles.noAccountText}>Don't have an account?</span>
            <Link className={styles.registerHereButton} to='/registration'>Register here</Link>
            {showError ?
                <ErrorMessage message={'Wrong username or password'} /> : null
            }
        </form>
  );
}

export const Login = observer(LoginComponent);