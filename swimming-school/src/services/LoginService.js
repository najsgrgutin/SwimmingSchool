import { postLoginRegistration } from './API'; 

export function loginUser(loginData, props) {
    return postLoginRegistration('login/', loginData)
        .then((response) => {
            if (response.non_field_errors) {
                return Promise.reject('Wrong username or password');
            }
            else {
                localStorage.setItem('token', response.token);
                props.history.push('/home');
            }
        })
}
