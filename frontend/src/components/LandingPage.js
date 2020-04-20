import React from "react";
import { Grid, Segment } from "semantic-ui-react";
// import logo from "../images/chestnut.png";
import LandingPageNavbar from "./LandingPageNavbar";
import LandingPageDesctiption from "./LandingPageDescription";
// import Signup from "./Signup";
import Signup from "./Signup";
import Login from "./Login";

const LandingPage = (props) => {
  return (
    <Grid columns={2} relaxed="very" stackable>
      <Grid.Column width={16}>
        <LandingPageNavbar />
      </Grid.Column>
      <Grid.Column width={10} verticalAlign="middle">
        <LandingPageDesctiption />
      </Grid.Column>
      <Grid.Column width={4} verticalAlign="middle" floated="left">
        <Signup />
      </Grid.Column>
    </Grid>
  );
};

export default LandingPage;
