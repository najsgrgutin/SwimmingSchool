import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginCont from './containers/LoginCont';
import RegistrationCont from './containers/RegistrationCont';
import WelcomePage from './components/WelcomePage';

function Application() {
    return (
        <Router>
            <Route exact path='/login' component={LoginCont} />
            <Route exact path='/registration' component={RegistrationCont} />
            <Route exact path='/welcome' component={WelcomePage} />
        </Router>
    );
}

ReactDOM.render(<Application />, document.getElementById('root'));
