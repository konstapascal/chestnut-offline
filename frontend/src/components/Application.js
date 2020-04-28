import React from 'react';
import { Form, Grid, Tab } from 'semantic-ui-react';

import MyKeysListApp from './MyKeysListApp';

const Application = () => {
	const appSubpages = [
		{
			menuItem: 'RSA',
			render: () => <Tab.Pane>RSA Page</Tab.Pane>,
		},
		{
			menuItem: 'AES',
			render: () => <Tab.Pane>AES Page</Tab.Pane>,
		},
		{
			menuItem: 'Base 64',
			render: () => <Tab.Pane>Base 64</Tab.Pane>,
		},

		{
			menuItem: 'ROT13',
			render: () => <Tab.Pane>ROT13</Tab.Pane>,
		},
		{
			menuItem: 'UUID',
			render: () => <Tab.Pane>UUID</Tab.Pane>,
		},
		{
			menuItem: 'Checksum',
			render: () => <Tab.Pane>Checksum</Tab.Pane>,
		},
	];
	return (
		<div style={{ margin: '2.5rem' }}>
			<h1>Application Page</h1>
			<Grid stackable columns={2}>
				<Grid.Column width={3} style={{ minWidth: '400px' }}>
					<MyKeysListApp />
				</Grid.Column>
				<Grid.Column width={9}>
					<Tab panes={appSubpages} />
				</Grid.Column>
			</Grid>
		</div>
	);
};

export default Application;
