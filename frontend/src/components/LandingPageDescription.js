import React from 'react';
import { Grid, Header, Button } from 'semantic-ui-react';

const LandingPageDescription = () => {
	return (
		<Grid>
			<Grid.Column>
				<Header as='h1'>Chestnut</Header>
				<Header.Subheader>
					<p className='subHeader'>
						Chestnut is an educational PKI web application. <br />
						We assist students in learning the fundamentals of PKI.
					</p>
					<p className='subHeader'>
						Press the demo button to try some of its features.
					</p>
				</Header.Subheader>
				<br />
				<Button color='green'>Try out the demo</Button>
			</Grid.Column>
		</Grid>
	);
};

export default LandingPageDescription;
