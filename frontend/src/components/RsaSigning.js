import React, { useState, useContext } from 'react';
import { Form, Message, Icon } from 'semantic-ui-react';
import SigningTooltip from './Tooltips/SigningTooltip';

import { SelectedKeyContext } from '../context/selected-key-context';

const forge = require('node-forge');

const RsaSigning = ({ setMdData }) => {
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
			return setError('Your field cannot be empty!');
		}

		const pemPrivKey = selectedKey.PrivateKey;
		const privKey = forge.pki.privateKeyFromPem(pemPrivKey);

		const md = forge.md.sha256.create();
		md.update(userInput);
		const mdData = md.digest().bytes();

		// Storing md in the parent component
		setMdData(forge.util.encode64(mdData));

		const signature = privKey.sign(md);
		const encodedSignature = forge.util.encode64(signature);

		setSignature(encodedSignature);
		setSuccess(
			`Your text has been signed successfully using ${selectedKey.Name}.`
		);
	};

	return (
		<div style={{ margin: '1.5rem' }}>
			<SigningTooltip />
			<p>
				Selected key: <b>{selectedKey.Name ? selectedKey.Name : 'None'}</b>
			</p>
			<p>
				Write plain text in the first area and it will be signed using your
				selected keypairs private key.
			</p>

			<Form>
				<Form.TextArea
					spellCheck={false}
					placeholder='Write or paste your text here...'
					style={{ minHeight: 100 }}
					onChange={e => setUserInput(e.target.value)}
				/>
				<Form.TextArea
					spellCheck={false}
					readOnly
					placeholder='Signature appears here...'
					style={{ minHeight: 100 }}
					value={signature}
				/>
				<Form.Button
					style={{
						backgroundColor: '#14872f'
					}}
					onClick={signText}>
					<p style={{ color: '#FFF' }}>Sign</p>
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
