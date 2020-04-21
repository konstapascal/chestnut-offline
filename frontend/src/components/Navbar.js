import React, { useState, useContext } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import logo from "../images/chestnut.png";
import { AuthContext } from "../context/auth-context";

const NavbarFunctional = () => {
  const [activeItem, setActiveItem] = useState("");
  const auth = useContext(AuthContext);

  //Highlights the clicked item on navbar
  const handleItemClick = (event, { name }) => setActiveItem(name);
  return (
    <Menu
      stackable
      inverted
      borderless
      compact
      attached="top"
      style={{ padding: "0 20px" }}
    >
      <Menu.Item as={Link} exact to="/" header="true">
        <img src={logo} alt="chestnut logo" />
      </Menu.Item>
      {auth.isLoggedIn && (
        <Menu.Item
          // as={Link}
          exact
          to="/"
          name="App"
          active={activeItem === "App"}
          onClick={handleItemClick}
        ></Menu.Item>
      )}
      {auth.isLoggedIn && (
        <Menu.Item
          // as={Link}
          exact
          to="/keys"
          name="My Keys"
          active={activeItem === "My Keys"}
          onClick={handleItemClick}
        ></Menu.Item>
      )}
      {auth.isLoggedIn && (
        <Menu.Item
          as={Link}
          exact
          to="/users"
          name="Search Users"
          active={activeItem === "Search Users"}
          onClick={handleItemClick}
        ></Menu.Item>
      )}
      {auth.isLoggedIn && (
        <Menu.Item
          // as={Link}
          exact
          to="/settings"
          name="Settings"
          active={activeItem === "Settings"}
          onClick={handleItemClick}
        ></Menu.Item>
      )}

      <Menu.Menu position="right">
        {/* //And should be admin which we add later */}
        {auth.isLoggedIn && (
          <Menu.Item
            // as={Link}
            exact
            to="/"
            name="Admin"
            active={activeItem === "Admin"}
            onClick={handleItemClick}
          ></Menu.Item>
        )}
        {/* <Menu.Item
          // as={Link}
          exact
          to="/Signup"
          name="Signup"
          active={activeItem === "Signup"}
          onClick={handleItemClick}
          position="right"
        ></Menu.Item> */}
        {!auth.isLoggedIn && (
          <Menu.Item
            as={Link}
            exact
            to="/Login"
            name="Login"
            active={activeItem === "Login"}
            onClick={handleItemClick}
            position="right"
          ></Menu.Item>
        )}
        {auth.isLoggedIn && (
          <Menu.Item
            //   as={Link}
            exact
            to="/Logout"
            name="Logout"
            active={activeItem === "Logout"}
            onClick={auth.logout}
            position="right"
          ></Menu.Item>
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default NavbarFunctional;
