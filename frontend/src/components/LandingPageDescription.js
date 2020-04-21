import React from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';

const LandignPageDescription = () => {
	return (
		<Grid>
			<Grid.Column width={14}>
				<Header as='h1' textAlign='center'>
					Chestnut
					<Header.Subheader>
						<span className='subHeader'>
							Chestnut is an educational web application. <br />
							We assist students to learn the fundamentals of PKI
						</span>
					</Header.Subheader>
				</Header>
			</Grid.Column>
		</Grid>
	);
};

export default LandignPageDescription;
