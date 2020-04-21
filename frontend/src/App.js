import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Users from './components/Users';

export default class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path='/' component={LandingPage} />
					<Route exact path='/welcome' component={LandingPage} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/signup' component={Signup} />
					<Route exact path='/users' component={Users} />
				</Switch>
			</BrowserRouter>
		);
	}
}
