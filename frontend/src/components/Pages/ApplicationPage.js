import React from 'react';
import { Grid, Tab } from 'semantic-ui-react';

import MYKeysList from '../MyKeysList';
import Base64 from '../Base64';
import Rot13 from '../Rot13';
import MyKeysList from '../MyKeysList';

const ApplicationPage = () => {
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
			render: () => (
				<Tab.Pane>
					<Base64 />
				</Tab.Pane>
			),
		},

		{
			menuItem: 'ROT13',
			render: () => (
				<Tab.Pane>
					<Rot13 />
				</Tab.Pane>
			),
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
					<MyKeysList />
				</Grid.Column>
				<Grid.Column width={9}>
					<Tab panes={appSubpages} />
				</Grid.Column>
			</Grid>
		</div>
	);
};

export default ApplicationPage;
