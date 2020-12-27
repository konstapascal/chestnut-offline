import React from 'react';
import { Label } from 'semantic-ui-react';
import { BasicTooltip } from './TooltipSchemas';

const DecryptionTooltip = () => {
	return (
		<BasicTooltip
			content={
				<div
					style={{
						textAlign: 'center',
						padding: '1rem'
					}}>
					<p>
						The conversion of encrypted data into its original form is
						called <b>decryption</b>.
					</p>
					<p>
						It is generally a reverse process of encryption that requires
						a <b>secret key</b> or <b>password</b>.
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
					What is decryption?
				</Label>
			</span>
		</BasicTooltip>
	);
};

export default DecryptionTooltip;
