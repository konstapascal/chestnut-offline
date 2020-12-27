import React from 'react';
import { Label } from 'semantic-ui-react';
import { BasicTooltip } from './TooltipSchemas';

const SymmetricTooltip = () => {
	return (
		<BasicTooltip
			content={
				<div
					style={{
						textAlign: 'center',
						padding: '1rem'
					}}>
					<p>
						<b>Symmetric Encryption</b> is a type of encryption where only
						one key (a <b>secret key</b> or <b>password</b>) is used to
						both encrypt and decrypt information.
					</p>
					<p>
						The entities communicating via <b>symmetric encryption</b>{' '}
						must exchange the key or password so that it can be used in
						the decryption process.
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
					What is symmetric encryption?
				</Label>
			</span>
		</BasicTooltip>
	);
};

export default SymmetricTooltip;
