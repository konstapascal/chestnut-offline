import React from 'react';
import { Label } from 'semantic-ui-react';
import { BasicTooltip } from './TooltipSchemas';

const EncryptionTooltip = () => {
	return (
		<BasicTooltip
			content={
				<div
					style={{
						textAlign: 'center',
						padding: '1rem'
					}}>
					<p>
						This process converts the original representation of the
						information, known as <b>plaintext</b>, into an alternative
						form known as <b>ciphertext</b>.
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
					What is encryption?
				</Label>
			</span>
		</BasicTooltip>
	);
};

export default EncryptionTooltip;
