import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ApplicationPage from './components/Pages/ApplicationPage';
import KeysPage from './components/Pages/KeysPage';
import Navbar from './components/Navbar';

import { SelectedKeyContext } from './context/selected-key-context';
import HomePage from './components/Pages/HomePage';
import ErrorPage from './components/Pages/ErrorPage';

const App = () => {
	// Selected key state
	const [selectedKey, setSelectedKey] = useState('');
	const defaultSelectedKeyValues = { selectedKey, setSelectedKey };

	return (
		// Initializing contexts with default values
		<SelectedKeyContext.Provider value={defaultSelectedKeyValues}>
			<BrowserRouter basename='/chestnut-offline'>
				<Navbar />
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route exact path='/application' component={ApplicationPage} />
					<Route exact path='/keys' component={KeysPage} />
					<Route component={ErrorPage} />
				</Switch>
			</BrowserRouter>
		</SelectedKeyContext.Provider>
	);
};

export default App;
