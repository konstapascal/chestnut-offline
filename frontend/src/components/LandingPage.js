import React from "react";
import { Grid } from "semantic-ui-react";

import LandingPageDesctiption from "./LandingPageDescription";
import Signup from "./Signup";

const LandingPage = (props) => {
  return (
    <div>
      <Grid relaxed textAlign="center" columns={2}>
        <Grid.Column width={10}>
          <LandingPageDesctiption />
        </Grid.Column>
        <Grid.Column width={6}>
          <Signup />
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default LandingPage;
