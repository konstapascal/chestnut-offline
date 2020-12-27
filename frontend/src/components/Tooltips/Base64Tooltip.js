import React from 'react';
import { Label } from 'semantic-ui-react';
import { BasicTooltip } from './TooltipSchemas';

const Base64Tooltip = () => {
	return (
		<BasicTooltip
			content={
				<div
					style={{
						textAlign: 'center',
						padding: '1rem'
					}}>
					<p>
						<b>Base64</b> is an encoding and decoding technique used to
						convert binary data to an American Standard for Information
						Interchange (ASCII) text format, and vice versa.
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
					What is Base64?
				</Label>
			</span>
		</BasicTooltip>
	);
};

export default Base64Tooltip;
