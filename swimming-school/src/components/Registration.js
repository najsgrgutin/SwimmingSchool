import React, { useState } from 'react';
import { observer } from 'mobx-react';
import useForm from 'react-hook-form';
import styles from './Registration.module.css'
import ErrorMessage from './ErrorMessage';


function RegistrationComponent({ onRegisterFunc, showError }) {

    const { register, handleSubmit, errors } = useForm();

    const [passwordsNotMatching, setPasswordsNotMatching] = useState('');

    function handleRegistrationClick(data) {
        if (data.user.password !== data.user.confirmPassword) {
            setPasswordsNotMatching(true);
            return;
        }
        onRegisterFunc(data.user);
    }

    return (
        <form className={styles.registrationContainer} onSubmit={handleSubmit(handleRegistrationClick)}>
            <h1 className={styles.registrationTitle}>Register</h1>
            <input 
                className={styles.registrationInput}
                placeholder='Username'
                name='user.username'
                ref={register({
                    required: true
                })}
            />
            <input 
                className={styles.registrationInput}
                placeholder='Email'
                type='email'
                name='user.email'
                ref={register({
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'This is not a valid email',
                    },
                })}
            />
            <div className={styles.formError}>
                {errors['user.email'] && errors['user.email'].message}
            </div>
            <input 
                className={styles.registrationInput}
                placeholder='Password'
                type='password'
                name='user.password'
                ref={register({
                    required: true,
                    minLength: {
                        value: 8,
                        message: 'Password has to be 8 characters or longer'
                    }
                })}
            />
            <div className={styles.formError}>
                {errors['user.password'] && errors['user.password'].message}
            </div>
            <input 
                className={styles.registrationInput}
                placeholder='Confirm password'
                type='password'
                name='user.confirmPassword'
                ref={register({
                    required: true,
                })}
            />
            <button className={styles.registrationButton} type='submit'>Register</button>   
            {passwordsNotMatching ?
                <ErrorMessage message={'Passwords are not matching'} /> : null
            } 
            {showError ?
                <ErrorMessage message={showError} /> : null
            }
        </form>
    );

}


export const Registration = observer(RegistrationComponent);