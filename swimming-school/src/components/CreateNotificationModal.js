import React, { useState } from 'react';
import useForm from 'react-hook-form';
import { observer } from 'mobx-react';
import styles from './CreateNotificationModal.module.css';

function CreateNotificationModalComponent({ goBack, stopPropagation, handleNotificationCreate }) {

    const { register, handleSubmit } = useForm();

    const [titleCounter, setCounterTitle] = useState(0);
    const [descriptionCounter, setDescriptionCounter] = useState(0);

    function changeTitleNumberCounter(event) {
        setCounterTitle(event.target.value.length);
    }

    function changeDescriptionNumberCounter(event) {
        setDescriptionCounter(event.target.value.length);
    }

    return (
        <form className={styles.screen} onClick={goBack} onSubmit={handleSubmit(handleNotificationCreate)}>
            <div className={styles.modalContainer} onClick={stopPropagation}>
                <div className={styles.modalTitle}>Create notification</div>
                <div className={styles.titleContainer}>  
                    <textarea 
                        className={styles.title}
                        placeholder='Title of the notification'
                        name='notification.title'
                        maxLength={100}
                        ref={register({ required: true })}
                        onChange={changeTitleNumberCounter}
                    />
                    <div className={styles.counter}>{titleCounter}/100</div>
                </div>
                <div className={styles.descriptionContainer}>
                    <textarea 
                        className={styles.description}
                        placeholder='Description'
                        name='notification.description'
                        maxLength={1000}
                        ref={register({ required: true })}
                        onChange={changeDescriptionNumberCounter}
                    />
                    <div className={styles.counter}>{descriptionCounter}/1000</div>
                </div>
                <button className={styles.publishButton} type='submit'>Publish</button>
            </div>
        </form>
    );

}

export const CreateNotificationModal = observer(CreateNotificationModalComponent);