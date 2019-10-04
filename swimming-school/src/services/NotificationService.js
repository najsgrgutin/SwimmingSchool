import { get } from './API';
import { postNotificationCreate } from './API';

export function getNotifications(token) {
    return get('notifications/', token);
}

export function getNotification(token, id) {
    return get(`notifications/${id}`, token);
}

export function createNotification(data, token) {
    return postNotificationCreate('notifications/', data, token);
}



