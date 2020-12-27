import React from 'react';
import { Label } from 'semantic-ui-react';
import { BasicTooltip } from './TooltipSchemas';

const RotTooltip = () => {
	return (
		<BasicTooltip
			content={
				<div
					style={{
						textAlign: 'center',
						padding: '1rem'
					}}>
					<p>
						<b>ROT13</b> ("rotate by 13 places", sometimes hyphenated
						ROT-13) is a simple letter substitution cipher that replaces a
						letter with the 13th letter after it, in the alphabet.
					</p>
					<p>
						ROT13 is a special case of the <b>Caesar cipher</b> which was
						developed in ancient Rome.
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
					What is ROT13?
				</Label>
			</span>
		</BasicTooltip>
	);
};

export default RotTooltip;
