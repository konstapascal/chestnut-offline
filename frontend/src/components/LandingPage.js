import React from "react";
import { Grid } from "semantic-ui-react";

import LandingPageDesctiption from "./LandingPageDescription";
import Signup from "./Signup";

const LandingPage = (props) => {
  return (
    <div>
      <Grid relaxed textAlign="center" columns={2}>
        <LandingPageDesctiption />
        <Signup />
      </Grid>
    </div>
  );
};

export default LandingPage;
