import React, { useState, useContext } from 'react';
import { Form, Message, Icon } from 'semantic-ui-react';

import { SelectedKeyContext } from '../context/selected-key-context';

var forge = require('node-forge');

const RsaSigning = () => {
	const { selectedKey } = useContext(SelectedKeyContext);

	const [userInput, setUserInput] = useState('');
	const [signature, setSignature] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const signText = () => {
		setError('');
		setSuccess('');
		setSignature('');

		if (userInput === '') {
			setError('Your field cannot be empty!');
			return;
		}

		const pemPrivKey = selectedKey.PrivateKey;
		const privKey = forge.pki.privateKeyFromPem(pemPrivKey);

		const md = forge.md.sha256.create();
		md.update(userInput);

		const signature = privKey.sign(md);
		const encodedSignature = forge.util.encode64(signature);

		setSignature(encodedSignature);
		setSuccess('Your text has been signed successfully!');
	};

	return (
		<div style={{ margin: '1.5rem' }}>
			<p>
				Selected key: <b>{selectedKey.Name ? selectedKey.Name : 'None'}</b>
			</p>
			<p>
				Write plain text in the first area and it will be signed using your
				selected keypairs private key.
			</p>

			<Form>
				<Form.TextArea
					placeholder='Write or paste your text here...'
					style={{ minHeight: 100 }}
					onChange={(e) => setUserInput(e.target.value)}
				/>
				<Form.TextArea
					readOnly
					placeholder='Signature appears here...'
					style={{ minHeight: 100 }}
					value={signature}
				/>
				<Form.Button color='green' onClick={signText}>
					Sign
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

export default RsaSigning;
