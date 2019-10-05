import { get, postNotificationCreate, deleteNotif } from './API';
import { toJS } from 'mobx';

export function getNotifications(token, appState) {
    return get('notifications/', token)
        .then((response) => {
            appState.notifications = response;
            return response;
        });
}

export function getNotification(token, id) {
    return get(`notifications/${id}`, token);
}

export function createNotification(data, token, notifications) {
    return postNotificationCreate('notifications/', data, token)
        .then((response) => notifications.push(response));
}

export function deleteNotification(token, id, notifications) {
    return deleteNotif(`notifications/${id}`, token)
            .then((response) => {
                if (response.status === 204) {
                    for (let i = 0; i < toJS(notifications).length; i++) {
                        if (toJS(notifications[i].id) === id) {
                            notifications.splice(i, 1);
                        }
                    }
                }
            });
}



