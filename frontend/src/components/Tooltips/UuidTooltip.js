import React from 'react';
import { Label } from 'semantic-ui-react';
import { InfoTooltip } from './TooltipSchemas';

const UuidTooltip = () => {
	return (
		<InfoTooltip
			content={
				<div
					style={{
						textAlign: 'center',
						padding: '1rem',
					}}
				>
					<p>
						A <b>universally unique identifier</b> (UUID) is a 128-bit number
						used to identify information in computer systems.
					</p>
					<p>
						While the probability that a UUID will be duplicated is not zero, it
						is close enough to zero to be negligible.
					</p>
				</div>
			}
		>
			<span>
				<Label
					basic
					color='green'
					size='large'
					as='a'
					style={{ marginBottom: '1.5rem' }}
				>
					What is a UUID?
				</Label>
			</span>
		</InfoTooltip>
	);
};

export default UuidTooltip;
