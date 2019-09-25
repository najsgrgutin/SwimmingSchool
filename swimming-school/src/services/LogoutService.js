export function logOut(props) {
    localStorage.removeItem('token');
    props.history.replace('/welcome');
}