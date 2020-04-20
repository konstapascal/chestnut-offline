import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import logo from "../images/chestnut.png";

const NavbarFunctional = () => {
  const [activeItem, setActiveItem] = useState("");

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

      <Menu.Item
        // as={Link}
        exact
        to="/"
        name="Home"
        active={activeItem === "Home"}
        onClick={handleItemClick}
      ></Menu.Item>

      <Menu.Menu position="right">
        {/* <Menu.Item
          // as={Link}
          exact
          to="/Signup"
          name="Signup"
          active={activeItem === "Signup"}
          onClick={handleItemClick}
          position="right"
        ></Menu.Item> */}

        <Menu.Item
          as={Link}
          exact
          to="/Login"
          name="Login"
          active={activeItem === "Login"}
          onClick={handleItemClick}
          position="right"
        ></Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default NavbarFunctional;
