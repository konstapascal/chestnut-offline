import React, { useState, useContext } from 'react';
import {
	Button,
	Form,
	Segment,
	Header,
	Input,
	Message,
	Icon
} from 'semantic-ui-react';
import axios from 'axios';
import { AuthContext } from '../context/auth-context';

const forge = require('node-forge');
const pki = forge.pki;

const typeOptions = [
	{
		key: 'rsa',
		text: 'RSA',
		value: 'RSA'
	}
];

const lengthOptions = [
	{
		key: '512',
		text: '512',
		value: '512'
	},
	{
		key: '1024',
		text: '1024',
		value: '1024'
	},
	{
		key: '2048',
		text: '2048',
		value: '2048'
	}
];

const GenerateKey = ({ handleRefresh }) => {
	const auth = useContext(AuthContext);

	const [keyName, setKeyName] = useState('');
	const [keyType, setKeyType] = useState(typeOptions[0].value);
	const [keyLength, setKeyLength] = useState(lengthOptions[1].value);

	const [errorMessage, setErrorMessage] = useState('');
	const [statusMessage, setStatusMessage] = useState('');

	const [isLoading, setIsLoading] = useState(false);

	const authHeader = {
		headers: {
			Authorization: auth.token
		}
	};

	const generateKey = () => {
		setErrorMessage('');
		setStatusMessage('');

		// Check if key name is empty
		if (keyName === '') {
			return setErrorMessage('Name cannot be empty!');
		}

		const keypair = pki.rsa.generateKeyPair({
			bits: keyLength,
			e: 0x10001
		});

		const pemPublicKey = pki.publicKeyToPem(keypair.publicKey);
		const pemPrivateKey = pki.privateKeyToPem(keypair.privateKey);
		axios
			.post(
				'http://localhost:8080/api/keys/new/users/me',
				{
					name: keyName,
					type: keyType,
					length: keyLength,
					publicKey: pemPublicKey,
					privateKey: pemPrivateKey
				},
				authHeader
			)
			.then(res => {
				setIsLoading(false);
				setStatusMessage(`Keypair ${keyName} was generated successfully!`);
				handleRefresh();
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<Segment style={{ maxWidth: 400, minWidth: 400, padding: '1.5rem' }}>
			<Header as='h2' dividing content='Generate a keypair' />
			<Form>
				<Form.Field>
					<p style={{ paddingBottom: '1rem' }}>
						Create a new key with desired length to add to your list.
					</p>
					<Input
						id='keyname'
						type='text'
						placeholder='Key name'
						onChange={e => {
							setKeyName(e.target.value);
						}}
					/>
				</Form.Field>
				<Form.Select
					label='Type'
					defaultValue={typeOptions[0].value}
					options={typeOptions}></Form.Select>
				<Form.Select
					label='Length'
					options={lengthOptions}
					defaultValue={lengthOptions[1].value}
					value={keyLength}
					onChange={(e, { value }) => setKeyLength(value)}></Form.Select>

				{isLoading ? (
					<Button onClick={generateKey} color='green' disabled>
						Generate
					</Button>
				) : (
					<Button onClick={generateKey} color='green'>
						Generate
					</Button>
				)}

				{errorMessage && (
					<Message error visible>
						<Icon color='red' name='times' size='large' />
						{errorMessage}
					</Message>
				)}
				{statusMessage && (
					<Message positive visible>
						<Icon color='green' name='checkmark' size='large' />
						{statusMessage}
					</Message>
				)}
			</Form>
		</Segment>
	);
};

export default GenerateKey;
