import React, { useState, useCallback, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import LandingPage from './components/Pages/LandingPage';
import UsersPage from './components/Pages/UsersPage';
import ApplicationPage from './components/Pages/ApplicationPage';
import KeysPage from './components/Pages/KeysPage';
import AccountSettingsPage from './components/Pages/AccountSettingsPage';
import AdminPage from './components/Pages/AdminPage';
import Navbar from './components/Navbar';
import jwtDecode from 'jwt-decode';

import { AuthContext } from './context/auth-context';
import { SelectedKeyContext } from './context/selected-key-context';

const App = () => {
	// Defining state variables
	const [token, setToken] = useState(null);
	const [username, setUsername] = useState('');
	const [id, setId] = useState('');
	const [loggedIn, setLoggedIn] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);

	// Selected key state
	const [selectedKey, setSelectedKey] = useState('');
	const defaultSelectedKeyValues = { selectedKey, setSelectedKey };

	const login = useCallback((token) => {
		setToken(token);
		setLoggedIn(true);

		// Decode token to extract data
		const decodedToken = jwtDecode(token);

		// Assign data from token to state variables
		setIsAdmin(decodedToken.isAdmin);
		setUsername(decodedToken.username);
		setId(decodedToken.id);

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

	// Default values for the auth context
	const defaultAuthValues = {
		token: token,
		username: username,
		id: id,
		isLoggedIn: loggedIn,
		isAdmin: isAdmin,
		login: login,
		logout: logout,
	};

	// Setting routes based on if logged in or not
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
				<Route exact path='/' component={ApplicationPage} />
				<Route exact path='/keys' component={KeysPage} />
				<Route exact path='/users' component={UsersPage} />
				<Route exact path='/settings' component={AccountSettingsPage} />
				<Route exact path='/admin' component={AdminPage} />
				<Redirect to='/' />
			</Switch>
		);
	}

	return (
		<AuthContext.Provider value={defaultAuthValues}>
			<SelectedKeyContext.Provider value={defaultSelectedKeyValues}>
				<Router>
					<Navbar />
					<main>{routes}</main>
				</Router>
			</SelectedKeyContext.Provider>
		</AuthContext.Provider>
	);
};

export default App;
