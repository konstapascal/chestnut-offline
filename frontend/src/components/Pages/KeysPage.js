import React from "react";
import { Form, Grid } from "semantic-ui-react";

import MyKeysList from "../MyKeysList";
import GenerateKey from "../GenerateKey";

const KeysPage = () => {
   return (
      <div style={{ margin: "2.5rem" }}>
         <h1>Keys Page</h1>
         <Grid stackable columns={2}>
            <Grid.Column width={3} style={{ minWidth: "400px" }}>
               <MyKeysList />
            </Grid.Column>
            <Grid.Column width={9}>
               <Grid.Row>
                  <Form>
                     <h3>Select a keypair to view it</h3>
                     <Form.Group widths="equal">
                        <Form.TextArea
                           label="Public Key:"
                           placeholder="Public Key"
                           style={{ minHeight: 100 }}
                           disabled
                        />
                        <Form.TextArea
                           label="Private Key:"
                           placeholder="Private Key"
                           style={{ minHeight: 100 }}
                           disabled
                        />
                     </Form.Group>
                  </Form>
               </Grid.Row>
               <Grid.Row>
                  <GenerateKey />
               </Grid.Row>
            </Grid.Column>
         </Grid>
      </div>
   );
};

export default KeysPage;
