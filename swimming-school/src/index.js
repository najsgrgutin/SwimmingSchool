import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginCont from './containers/LoginCont';
import RegistrationCont from './containers/RegistrationCont';

function Application() {
    return (
        <Router>
            <Route exact path='/login' component={LoginCont} />
            <Route exact path='/registration' component={RegistrationCont} />
        </Router>
    );
}

ReactDOM.render(<Application />, document.getElementById('root'));
