import React, { useContext } from 'react';
import { Form, Grid, Header, Container } from 'semantic-ui-react';

import MyKeysList from '../MyKeysList';
import GenerateKey from '../GenerateKey';

import { SelectedKeyContext } from '../../context/selected-key-context';
import HeaderSubHeader from 'semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader';

const KeysPage = () => {
	const { selectedKey } = useContext(SelectedKeyContext);

<<<<<<< HEAD
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
                     <h5>Selected key: {selectedKey.Name}</h5>
                     <Form.Group widths='equal'>
                        <Form.TextArea
                           value={selectedKey.PrivateKey}
                           label='Private Key:'
                           placeholder='Private Key'
                           style={{ minHeight: 100 }}
                           // disabled
                        />
                        <Form.TextArea
                           value={selectedKey.PublicKey}
                           label='Public Key:'
                           placeholder='Public Key'
                           style={{ minHeight: 100 }}
                           // disabled
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
=======
	return (
		<div style={{ margin: '2.5rem' }}>
			<h1>Keys Page</h1>
			<Grid stackable columns={2}>
				<Grid.Column width={3} style={{ minWidth: '400px' }}>
					<MyKeysList />
				</Grid.Column>
				<Grid.Column width={9}>
					<Grid.Row>
						<Form>
							<Header as='h2' dividing content='Select key to view it' />
							<p style={{ fontSize: '1.2rem', padding: '.5rem' }}>
								Name: <b>{selectedKey.Name ? selectedKey.Name : '-'}</b>
							</p>
							<Form.Group widths='equal'>
								<Form.TextArea
									spellCheck={false}
									readOnly={true}
									value={selectedKey.PublicKey}
									label='Public Key:'
									placeholder='Public Key'
									style={{ minHeight: 100 }}
								/>
								<Form.TextArea
									spellCheck={false}
									readOnly={true}
									value={selectedKey.PrivateKey}
									label='Private Key:'
									placeholder='Private Key'
									style={{ minHeight: 100 }}
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
>>>>>>> fb69342325a0ad9bdd9fd06f981bae5f62af08bb
};

export default KeysPage;
