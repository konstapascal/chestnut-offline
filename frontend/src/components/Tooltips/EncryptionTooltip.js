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
						This process converts the original representation of the
						information, known as <b>plaintext</b>, into an alternative form
						known as <b>ciphertext</b>.
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
					What is encryption?
				</Label>
			</span>
		</InfoTooltip>
	);
};

export default EncryptionTooltip;
