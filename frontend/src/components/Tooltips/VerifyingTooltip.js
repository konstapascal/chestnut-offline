import React from 'react';
import { Label } from 'semantic-ui-react';
import { InfoTooltip } from './TooltipSchemas';

const VerifyingTooltip = () => {
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
						<b>Verifying</b> a signature means to check the signature validity
						and whether any changes have been made to the message or document
						since it was signed.
					</p>
				</div>
			}
		>
			<span>
				<Label
					basic
					size='large'
					as='a'
					style={{
						marginBottom: '1.5rem',
						color: '#14872f',
						borderColor: '#14872f',
					}}
				>
					What is the verification process?
				</Label>
			</span>
		</InfoTooltip>
	);
};

export default VerifyingTooltip;
