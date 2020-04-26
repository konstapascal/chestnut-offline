import React, { useState, useCallback, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import { AuthContext } from './context/auth-context';
import Users from './components/Users';
import Application from './components/Application';
import Keys from './components/Keys';
import AccountSettings from './components/AccountSettings';
import AdminPage from './components/AdminPage';
import Navbar from './components/Navbar';
import jwtDecode from 'jwt-decode';

const App = () => {
	// Defining state variables
	const [token, setToken] = useState(null);
	const [username, setUsername] = useState('');
	const [loggedIn, setLoggedIn] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);

	const login = useCallback((token) => {
		setToken(token);
		setLoggedIn(true);

		// Decode token to extract data
		const decodedToken = jwtDecode(token);

		// Assign data from token to state variables
		setIsAdmin(decodedToken.isAdmin);
		setUsername(decodedToken.username);

		localStorage.setItem('userData', JSON.stringify({ token: token }));
	}, []);

	const logout = useCallback(() => {
		// Restoring all defaults on logout
		setToken(null);
		setUsername('');
		setLoggedIn(false);
		setIsAdmin(false);
		localStorage.removeItem('userData');
	}, []);

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem('userData'));
		if (storedData && storedData.token) {
			login(storedData.token);
		}
	}, [login]);

	let routes;

	if (!token) {
		routes = (
			<Switch>
				<Route exact path='/' component={LandingPage} />
				<Redirect to='/' />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route exact path='/' component={Application} />
				<Route exact path='/keys' component={Keys} />
				<Route exact path='/users' component={Users} />
				<Route exact path='/settings' component={AccountSettings} />
				<Route exact path='/admin' component={AdminPage} />
				<Redirect to='/' />
			</Switch>
		);
	}

	return (
		<AuthContext.Provider
			value={{
				token: token,
				username: username,
				isLoggedIn: loggedIn,
				isAdmin: isAdmin,
				login: login,
				logout: logout,
			}}
		>
			<Router>
				<Navbar />
				<main>{routes}</main>
			</Router>
		</AuthContext.Provider>
	);
};

export default App;
