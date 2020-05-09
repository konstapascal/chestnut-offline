import React, { useContext } from 'react';
import { Form, Grid, Header, Segment } from 'semantic-ui-react';

import MyKeysList from '../MyKeysList';
import GenerateKey from '../GenerateKey';

import { SelectedKeyContext } from '../../context/selected-key-context';

const KeysPage = () => {
	const { selectedKey } = useContext(SelectedKeyContext);

	return (
		<div style={{ margin: '2.5rem' }}>
			<h1>Keys Page</h1>
			<Grid stackable columns={3}>
				<Grid.Column width={3} style={{ minWidth: '400px' }}>
					<MyKeysList />
				</Grid.Column>
				<Grid.Column
					width={6}
					style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
				>
					<Segment style={{ padding: '1.5rem' }}>
						<Form>
							<Header as='h2' dividing content='Select a keypair' />
							<p style={{ paddingBottom: '1rem' }}>
								Select a keypair from the list on the left to view its keys.
							</p>
							<Form.TextArea
								spellCheck={false}
								readOnly
								value={selectedKey.PublicKey}
								label='Public Key:'
								placeholder='Public Key'
								style={{ minHeight: 150 }}
							/>
							<Form.TextArea
								spellCheck={false}
								readOnly
								value={selectedKey.PrivateKey}
								label='Private Key:'
								placeholder='Private Key'
								style={{ minHeight: 150 }}
							/>
						</Form>
					</Segment>
				</Grid.Column>
				<Grid.Column width={3}>
					<GenerateKey />
				</Grid.Column>
			</Grid>
		</div>
	);
};

export default KeysPage;
