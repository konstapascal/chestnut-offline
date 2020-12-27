import React, { useState, useContext } from 'react';
import { Form, Message, Icon, Label } from 'semantic-ui-react';
import axios from 'axios';

import { AuthContext } from '../context/auth-context';
import { SelectedKeyContext } from '../context/selected-key-context';
import EncryptionTooltip from './Tooltips/EncryptionTooltip';

const RsaEncryption = () => {
	const auth = useContext(AuthContext);
	const { selectedKey } = useContext(SelectedKeyContext);

	const [userInput, setUserInput] = useState('');
	const [rsaEncrypted, setRsaEncrypted] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const authHeader = {
		headers: {
			Authorization: auth.token
		}
	};

	const encryptText = () => {
		setError('');
		setSuccess('');
		setRsaEncrypted('');

		const encryptUrl = 'http://localhost:8080/api/encrypt';
		const pubKey = selectedKey.PublicKey;

		if (userInput === '') {
			setError('Your field cannot be empty!');
			return;
		}

		axios
			.post(
				encryptUrl,
				{
					text: userInput,
					publicKey: pubKey
				},
				authHeader
			)
			.then(response => {
				setRsaEncrypted(response.data.encryptedText);
				setSuccess(
					`Your string has been encrypted successfully using ${selectedKey.Name}.`
				);
			})
			.catch(() => {
				setError(
					`Something went wrong encrypting your string using ${selectedKey.Name}.`
				);
			});
	};

	return (
		<div style={{ margin: '1.5rem' }}>
			<EncryptionTooltip />
			<p>
				Selected key: <b>{selectedKey.Name ? selectedKey.Name : 'None'}</b>
			</p>
			<p>
				Write plain text in the first area and it will be encrypted using
				your selected keypairs public key.
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
					placeholder='Ecrypted text appears here...'
					style={{ minHeight: 100 }}
					value={rsaEncrypted}
				/>
				<Form.Button
					style={{
						backgroundColor: '#14872f'
					}}
					onClick={encryptText}>
					<p style={{ color: '#FFF' }}>Encrypt</p>
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

export default RsaEncryption;
