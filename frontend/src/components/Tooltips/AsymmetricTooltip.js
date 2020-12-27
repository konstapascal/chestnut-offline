import React from 'react';
import { Label } from 'semantic-ui-react';
import { BasicTooltip } from './TooltipSchemas';

const AsymmetricTooltip = () => {
	return (
		<BasicTooltip
			content={
				<div
					style={{
						textAlign: 'center',
						padding: '1rem'
					}}>
					<p>
						<b>Asymmetric Encryption</b> is a form of encryption where
						keys come in <b>pairs</b>. What one key encrypts, only the
						other can decrypt.
					</p>
					<p>
						This is also known as <b>Public Key Cryptography</b>, since
						users typically create a matching key pair, and make one
						public while keeping the other secret.
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
					What is asymmetric encryption?
				</Label>
			</span>
		</BasicTooltip>
	);
};

export default AsymmetricTooltip;
