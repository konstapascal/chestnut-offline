import React, { useContext } from 'react';
import { Form, Grid, Header, Container } from 'semantic-ui-react';

import MyKeysList from '../MyKeysList';
import GenerateKey from '../GenerateKey';

import { SelectedKeyContext } from '../../context/selected-key-context';

const KeysPage = () => {
	const { selectedKey } = useContext(SelectedKeyContext);

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
							<Header as='h2' dividing content='Select a keypair to view it' />
							<p style={{ fontSize: '1.2rem', padding: '.5rem' }}>
								Name: <b>{selectedKey.Name ? selectedKey.Name : 'None'}</b>
							</p>
							<Form.Group widths='equal'>
								<Form.TextArea
									spellCheck={false}
									readOnly
									value={selectedKey.PublicKey}
									label='Public Key:'
									placeholder='Public Key'
									style={{ minHeight: 100 }}
								/>
								<Form.TextArea
									spellCheck={false}
									readOnly
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
};

export default KeysPage;
