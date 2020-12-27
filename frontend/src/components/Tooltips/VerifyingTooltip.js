import React from 'react';
import { Label } from 'semantic-ui-react';
import { BasicTooltip } from './TooltipSchemas';

const VerifyingTooltip = () => {
	return (
		<BasicTooltip
			content={
				<div
					style={{
						textAlign: 'center',
						padding: '1rem'
					}}>
					<p>
						<b>Verifying</b> a signature means to check the signature
						validity and whether any changes have been made to the message
						or document since it was signed.
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
					What is the verification process?
				</Label>
			</span>
		</BasicTooltip>
	);
};

export default VerifyingTooltip;
