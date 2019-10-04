import { get } from './API';
import { postNotificationCreate } from './API';
import { deleteNotif } from './API';

export function getNotifications(token) {
    return get('notifications/', token);
}

export function getNotification(token, id) {
    return get(`notifications/${id}`, token);
}

export function createNotification(data, token) {
    return postNotificationCreate('notifications/', data, token);
}

export function deleteNotification(token, id) {
    return deleteNotif(`notifications/${id}`, token)
            .then((response) => console.log(response));
}



