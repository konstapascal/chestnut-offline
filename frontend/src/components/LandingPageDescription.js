import React from "react";
import { Grid, Image, Header } from "semantic-ui-react";

const LandignPageDescription = () => {
  return (
    <Grid>
      <Grid.Column width={14}>
        <div>
          <Header as="h1" textAlign="center">
            {/* <Icon name="users" circular /> */}
            Chestnut
            <Header.Subheader>
              <span className="subHeader">
                Chestnut is an educational web application. We assist
                <br />
                students to learn the fundamentals of PKI
              </span>
            </Header.Subheader>
          </Header>
          <Image
            centered
            size="large"
            src="https://react.semantic-ui.com/images/wireframe/centered-paragraph.png"
          />
        </div>
      </Grid.Column>
    </Grid>
  );
};

export default LandignPageDescription;
