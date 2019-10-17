import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import { HomeCont } from './containers/HomeCont';
import { LoginCont } from './containers/LoginCont';
import { RegistrationCont } from './containers/RegistrationCont';
import { WelcomePage } from './components/WelcomePage';
import { NotificationModalCont } from './containers/NotificationModalCont';
import { CreateNotificationModalCont } from './containers/CreateNotificationModalCont';
import { UserListCont } from './containers/UserListCont';

function PrivateRoute({ isLoggedIn, Comp, ...rest }) {
    function render(props) {
        return isLoggedIn ? <Comp {...props} /> : <Redirect to='/login' />;
    }
    return <Route {...rest} component={render} />;
}

function Application() {
    
    const loggedIn = localStorage.getItem('token');

    return (
        <Router>
            <PrivateRoute isLoggedIn={Boolean(loggedIn)} path='/home' Comp={HomeCont} />
            <PrivateRoute isLoggedIn={Boolean(loggedIn)} path='/home/notification/:id' Comp={NotificationModalCont} />
            <PrivateRoute isLoggedIn={Boolean(loggedIn)} path='/home/create' Comp={CreateNotificationModalCont} />
            <Route exact path='/login' component={LoginCont} />
            <Route exact path='/registration' component={RegistrationCont} />
            <Route exact path='/welcome' component={WelcomePage} />
            <Route exact path='/table' component={UserListCont} />
        </Router>
    );
}

export const App = observer(Application);

ReactDOM.render(<App />, document.getElementById('root'));
