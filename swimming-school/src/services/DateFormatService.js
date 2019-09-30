import moment from 'moment';

export function getDate(timestamp) {
    moment();
    return moment(timestamp.split('T')[0]).format('LL');
}

export function getTime(timestamp) {
    return timestamp.split('T')[1].slice(0, 5);
}