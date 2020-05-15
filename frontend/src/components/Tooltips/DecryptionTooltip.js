import React from 'react';
import { Label } from 'semantic-ui-react';
import { InfoTooltip } from './TooltipSchemas';

const DecryptionTooltip = () => {
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
						The conversion of encrypted data into its original form is called{' '}
						<b>decryption</b>.
					</p>
					<p>
						It is generally a reverse process of encryption that requires a{' '}
						<b>secret key</b> or <b>password</b>.
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
					What is decryption?
				</Label>
			</span>
		</InfoTooltip>
	);
};

export default DecryptionTooltip;
