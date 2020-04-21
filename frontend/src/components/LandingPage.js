import React from "react";
import { Grid } from "semantic-ui-react";

import LandingPageDesctiption from "./LandingPageDescription";
import Signup from "./Signup";

const LandingPage = (props) => {
  return (
    <Grid columns={2} relaxed="very" stackable>
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
