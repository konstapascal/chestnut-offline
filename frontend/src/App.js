import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LandingPageNavbar from './components/LandingPageNavbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Users from './components/Users';
import Keys from './components/Keys';
import AccountSettings from './components/AccountSettings';
import AdminPage from './components/AdminPage';
import Application from './components/Application';
import PageNotFound from './components/PageNotFound';

export default class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<LandingPageNavbar />
				<Switch>
					<Route exact path='/' component={LandingPage} />
					<Route exact path='/application' component={Application} />
					<Route exact path='/keys' component={Keys} />
					<Route exact path='/users' component={Users} />
					<Route exact path='/settings' component={AccountSettings} />
					<Route exact path='/admin' component={AdminPage} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/signup' component={Signup} />
					<Route component={PageNotFound} />
				</Switch>
			</BrowserRouter>
		);
	}
}
