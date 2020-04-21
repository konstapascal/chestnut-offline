<<<<<<< HEAD
import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { AuthContext } from "./context/auth-context";

import Navbar from "./components/Navbar";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //check callbacks later
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (!isLoggedIn) {
    // checking commit
    routes = (
      <Switch>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <Navbar />
        {/* <SideBar /> */}
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
=======
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
>>>>>>> 3ec5db7344453192b1c7abcf4d1883e28acd0b69
