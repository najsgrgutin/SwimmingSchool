import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import HomeCont from './containers/HomeCont';
import LoginCont from './containers/LoginCont';
import RegistrationCont from './containers/RegistrationCont';
import WelcomePage from './components/WelcomePage';
import NotificationModalCont from './containers/NotificationModalCont';
import CreateNotificationCont from './containers/CreateNotificationModalCont';

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
            <PrivateRoute isLoggedIn={Boolean(loggedIn)} path='/home/create' Comp={CreateNotificationCont} />
            <Route exact path='/login' component={LoginCont} />
            <Route exact path='/registration' component={RegistrationCont} />
            <Route exact path='/welcome' component={WelcomePage} />
        </Router>
    );
}

ReactDOM.render(<Application />, document.getElementById('root'));
