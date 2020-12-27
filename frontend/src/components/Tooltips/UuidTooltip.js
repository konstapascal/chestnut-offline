import React from 'react';
import { Label } from 'semantic-ui-react';
import { BasicTooltip } from './TooltipSchemas';

const UuidTooltip = () => {
	return (
		<BasicTooltip
			content={
				<div
					style={{
						textAlign: 'center',
						padding: '1rem'
					}}>
					<p>
						A <b>universally unique identifier</b> (UUID) is a 128-bit
						number used to identify information in computer systems.
					</p>
					<p>
						While the probability that a UUID will be duplicated is not
						zero, it is close enough to zero to be negligible.
					</p>
				</div>
			}>
			<span>
				<Label
					basic
					size='large'
					as='a'
					style={{
						marginBottom: '1.5rem',
						color: '#14872f',
						borderColor: '#14872f'
					}}>
					What is a UUID?
				</Label>
			</span>
		</BasicTooltip>
	);
};

export default UuidTooltip;
