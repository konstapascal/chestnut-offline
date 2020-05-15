import React from 'react';
import { Label } from 'semantic-ui-react';
import { InfoTooltip } from './TooltipSchemas';

const EncryptionTooltip = () => {
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
						A <b>digital signature</b> is a mathematical technique used to
						validate the authenticity and integrity of a message, software or
						digital document.
					</p>
					<p>
						<b>RSA signature</b> is a type of digital signature, which uses the
						RSA asymmetric key algorithm.
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
					What is a signature?
				</Label>
			</span>
		</InfoTooltip>
	);
};

export default EncryptionTooltip;
