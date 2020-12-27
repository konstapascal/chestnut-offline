import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';

import LandingPageDescription from '../LandingPageDescription';
import DemoPage from './DemoPage';
import Signup from '../Signup';
import Login from '../Login';

const LandingPage = () => {
	const [demoComponent, setDemoComponent] = useState(true);
	const [authComponent, setAuthComponent] = useState(true);

	const DemoComponentSwap = () => setDemoComponent(component => !component);
	const AuthComponentSwap = () => setAuthComponent(component => !component);

	return (
		<Grid
			stackable
			centered
			verticalAlign='middle'
			columns={2}
			style={{ height: '90vh' }}>
			<Grid.Column width={6}>
				{demoComponent ? (
					<LandingPageDescription componentSwap={DemoComponentSwap} />
				) : (
					<DemoPage componentSwap={DemoComponentSwap} />
				)}
			</Grid.Column>
			<Grid.Column width={6}>
				{authComponent ? (
					<Login componentSwap={AuthComponentSwap} />
				) : (
					<Signup componentSwap={AuthComponentSwap} />
				)}
			</Grid.Column>
		</Grid>
	);
};

export default LandingPage;
