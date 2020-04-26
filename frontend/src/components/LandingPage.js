import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';

import LandingPageDescription from './LandingPageDescription';
import Signup from './Signup';
import Login from './Login';

const LandingPage = (props) => {
	const [component, setComponent] = useState(true);
	const componentSwap = () => setComponent((component) => !component);

	return (
		<div style={{ margin: '5em' }}>
			<Grid doubling textAlign='center' columns={2}>
				<Grid.Column width={8}>
					<LandingPageDescription />
				</Grid.Column>
				<Grid.Column width={8}>
					{component && <Login componentSwap={componentSwap} />}
					{!component && <Signup componentSwap={componentSwap} />}
				</Grid.Column>
			</Grid>
		</div>
	);
};

export default LandingPage;
