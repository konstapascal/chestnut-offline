import React, { useContext, useState } from 'react';
import { Form, Message, Icon } from 'semantic-ui-react';
import VerifyingTooltip from './Tooltips/VerifyingTooltip';

import { SelectedKeyContext } from '../context/selected-key-context';

const forge = require('node-forge');

const RsaVerifying = ({ mdData }) => {
	const { selectedKey } = useContext(SelectedKeyContext);

	const [signature, setSignature] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const verifySignature = () => {
		setError('');
		setSuccess('');

		if (signature === '') {
			return setError('Your field cannot be empty!');
		}

		if (mdData === undefined) {
			return setError(
				'Hash was not found. Sign your text and come back to try again.'
			);
		}

		const pemPubKey = selectedKey.PublicKey;
		const pubKey = forge.pki.publicKeyFromPem(pemPubKey);

		const decodedMdData = forge.util.decode64(mdData);
		const decodedSignature = forge.util.decode64(signature);

		try {
			pubKey.verify(decodedMdData, decodedSignature);
			setSuccess(`Signature was verified using ${selectedKey.Name}.`);
		} catch {
			setError(`Signature could not be verified using ${selectedKey.Name}.`);
		}
	};

	return (
		<div style={{ margin: '1.5rem' }}>
			<VerifyingTooltip />
			<p>
				Selected key: <b>{selectedKey.Name ? selectedKey.Name : 'None'}</b>
			</p>
			<p>
				Paste in your signature in the text area and it will be verified
				using the selected public key.
			</p>

			<Form>
				<Form.TextArea
					spellCheck={false}
					placeholder='Write or paste your signature here...'
					style={{ minHeight: 100 }}
					onChange={e => setSignature(e.target.value)}
				/>
				<Form.Button
					style={{
						backgroundColor: '#14872f'
					}}
					onClick={verifySignature}>
					<p style={{ color: '#FFF' }}>Verify</p>
				</Form.Button>

				{error && (
					<Message error visible>
						<Icon color='red' name='times' size='large' />
						{error}
					</Message>
				)}
				{success && (
					<Message success visible>
						<Icon color='green' name='checkmark' size='large' />
						{success}
					</Message>
				)}
			</Form>
		</div>
	);
};

export default RsaVerifying;
