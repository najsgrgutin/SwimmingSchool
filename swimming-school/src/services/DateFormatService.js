export function getDate(timestamp) {
    return timestamp.split('T')[0];
}

export function getTime(timestamp) {
    return timestamp.split('T')[1].slice(0, 5);
}