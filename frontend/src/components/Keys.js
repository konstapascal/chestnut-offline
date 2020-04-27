import React from 'react';
import { Form, Grid, Tab } from 'semantic-ui-react';

import MyKeysList from './MyKeysList';

const Keys = () => {
	const listMenus = [
		{
			menuItem: 'My keys',
			render: () => (
				<Tab.Pane>
					<MyKeysList />
				</Tab.Pane>
			),
		},
		{
			menuItem: 'User Keys',
			render: () => <Tab.Pane>Tab 2</Tab.Pane>,
		},
	];

	return (
		<Grid stackable columns={2} style={{ margin: '2.5rem' }}>
			<Grid.Column width={3} style={{ minWidth: '400px' }}>
				<Tab panes={listMenus} />
			</Grid.Column>
			<Grid.Column width={9}>
				<Grid.Row>
					<Form>
						<h3>Select a key to view it</h3>
						<Form.Group widths='equal'>
							<Form.TextArea
								label='Public Key:'
								placeholder='Public Key'
								style={{ minHeight: 100 }}
							/>
							<Form.TextArea
								label='Private Key:'
								placeholder='Private Key'
								style={{ minHeight: 100 }}
							/>
						</Form.Group>
					</Form>
				</Grid.Row>
				<Grid.Row>
					<h3>Create new key</h3>
				</Grid.Row>
			</Grid.Column>
		</Grid>
	);
};

export default Keys;
