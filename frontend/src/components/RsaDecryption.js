import React, { useState, useContext } from 'react';
import { Form, Message, Icon, Label } from 'semantic-ui-react';
import axios from 'axios';
import DecryptionTooltip from './Tooltips/DecryptionTooltip';

import { SelectedKeyContext } from '../context/selected-key-context';

const RsaDecryption = () => {
	const { selectedKey } = useContext(SelectedKeyContext);

	const [userInput, setUserInput] = useState('');
	const [rsaDecrypted, setRsaDecrypted] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const decryptText = () => {
		setError('');
		setSuccess('');
		setRsaDecrypted('');

		const privKey = selectedKey.PrivateKey;

		if (userInput === '') {
			setError('Your field cannot be empty!');
			return;
		}

		// TODO: decrypt RSA text
	};

	return (
		<div style={{ margin: '1.5rem' }}>
			<DecryptionTooltip />
			<p>
				Selected key: <b>{selectedKey.Name ? selectedKey.Name : 'None'}</b>
			</p>
			<p>
				Paste in your encrypted text in the first area and it will be
				decrypted using your selected key.
			</p>
			<Form onSubmit={decryptText}>
				<Form.TextArea
					spellCheck={false}
					placeholder='Write or paste your encrypted text here...'
					style={{ minHeight: 100 }}
					onChange={e => setUserInput(e.target.value)}
				/>
				<Form.TextArea
					readOnly
					placeholder='Plain text appears here...'
					style={{ minHeight: 100 }}
					value={rsaDecrypted}
				/>
				<Form.Button
					style={{
						backgroundColor: '#14872f'
					}}
					onClick={decryptText}>
					<p style={{ color: '#FFF' }}>Decrypt</p>
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

export default RsaDecryption;
