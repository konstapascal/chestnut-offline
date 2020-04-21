import React, { useState, useCallback, useEffect } from "react";
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
import Users from "./components/Users";

import Navbar from "./components/Navbar";

const App = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  //check callbacks later
  const login = useCallback((id, token) => {
    setToken(token);
    setUserId(id);
    localStorage.setItem(
      "userData",
      JSON.stringify({ userId: id, token: token })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token);
    }
  }, []);

  let routes;

  if (!token) {
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
        <Route path="/users" exact>
          <Users />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout,
      }}
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
