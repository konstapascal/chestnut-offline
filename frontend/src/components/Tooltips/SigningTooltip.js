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
						A <b>digital signature</b> is a mathematical technique used to
						validate the authenticity and integrity of a message, software
						or digital document.
					</p>
					<p>
						<b>RSA signature</b> is a type of digital signature, which
						uses the RSA asymmetric key algorithm.
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
					What is a signature?
				</Label>
			</span>
		</BasicTooltip>
	);
};

export default EncryptionTooltip;
