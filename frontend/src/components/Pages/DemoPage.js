import React from 'react';
import { Tab, Button } from 'semantic-ui-react';
import SymmetricSubpage from './SymmetricSubpage';
import UtilitiesSubpage from './UtilitiesSubpage';

const DemoPage = ({ componentSwap }) => {
	const demoSubpages = [
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
		<div style={{ minWidth: '600px', margin: 'auto' }}>
			<Tab panes={demoSubpages} />
			<Button
				onClick={componentSwap}
				style={{ marginTop: '1rem', backgroundColor: '#14872f' }}
			>
				<p style={{ color: '#FFF' }}>Back</p>
			</Button>
		</div>
	);
};

export default DemoPage;
