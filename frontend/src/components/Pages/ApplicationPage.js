import React from 'react';
import { Grid, Tab } from 'semantic-ui-react';
import MyKeysList from '../MyKeysList';
import AsymmetricSubpage from './AsymmetricSubpage';
import SymmetricSubpage from './SymmetricSubpage';
import UtilitiesSubpage from './UtilitiesSubpage';

const ApplicationPage = () => {
	const appSubpages = [
		{
			menuItem: 'Asymmetric Encryption',
			render: () => (
				<Tab.Pane>
					<AsymmetricSubpage />
				</Tab.Pane>
			),
		},
		{
			menuItem: 'Symmetric Encryption',
			render: () => (
				<Tab.Pane>
					<SymmetricSubpage />
				</Tab.Pane>
			),
		},
		{
			menuItem: 'Utilities',
			render: () => (
				<Tab.Pane>
					<UtilitiesSubpage />
				</Tab.Pane>
			),
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
