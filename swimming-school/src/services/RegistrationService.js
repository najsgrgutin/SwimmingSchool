import { post } from './API'; 

export function registerUser(user, props) {
    return post('users/registration/', user)
        .then((response) => {
            if (response.username instanceof Array)
                return Promise.reject('Username already taken');
            else if (response.email instanceof Array)
                return Promise.reject('Email already in use');
            else if (response.password instanceof Array)
                return Promise.reject(response.password[0]);
            else 
                props.history.push('/login');
        });
}


