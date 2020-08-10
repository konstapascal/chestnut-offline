import React, { Fragment } from 'react';
import { Grid, Header, Button } from 'semantic-ui-react';

const LandingPageDescription = ({ componentSwap }) => {
	return (
		<div style={{ textAlign: 'center' }}>
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
			<Button onClick={componentSwap} style={{ backgroundColor: '#14872f' }}>
				<p style={{ color: '#FFF' }}>Try out demo!</p>
			</Button>
		</div>
	);
};

export default LandingPageDescription;
