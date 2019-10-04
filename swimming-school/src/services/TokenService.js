import jwt_decode from 'jwt-decode';

export function tokenService() {
    const decoded = jwt_decode(localStorage.getItem('token'));
    const current_time = new Date().getTime() / 1000;
    return [decoded, current_time];
}