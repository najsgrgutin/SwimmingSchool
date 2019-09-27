import { get } from './API';

export function getNotifications(token) {
    return get('notifications/', token);
}

export function getNotification(token, id) {
    return get(`notifications/${id}`, token);
}



