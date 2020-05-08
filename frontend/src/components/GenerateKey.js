import React, { useState, useContext } from 'react';
import { Button, Form, Segment, Header } from 'semantic-ui-react';
import axios from 'axios';
import { useForm } from '../hooks/form-hook';
import { VALIDATOR_REQUIRE } from '../util/validators';
import Input from '../components/FormElements/Input';
import { AuthContext } from '../context/auth-context';

var forge = require('node-forge');

// import rsaKeyPair from "rsa-keypair";

const GenerateKey = () => {
	const auth = useContext(AuthContext);

	const typeOptions = [
		{
			key: 'rsa',
			text: 'RSA',
			value: 'rsa',
		},
	];
	const lengthOptions = [
		{
			key: '512',
			text: '512',
			value: '512',
		},
		{
			key: '1024',
			text: '1024',
			value: '1024',
		},
		{
			key: '2048',
			text: '2048',
			value: '2048',
		},
		{
			key: '4096',
			text: '4096',
			value: '4096',
		},
	];

	let pki = forge.pki;
	const [keyType, setKeyType] = useState('');
	const [keyLength, setKeyLength] = useState();
	const [statusMessage, setStatus] = useState('');
	const [errorMessage, setError] = useState('');
	const [formState, inputHandler] = useForm(
		{
			keyname: {
				value: '',
				isValid: false,
			},
		},
		false
	);

	const exampleString =
		'Text that is going to be sent over an insecure channel and must be encrypted at all costs! ';

	const authHeader = {
		headers: {
			Authorization: auth.token,
		},
	};

	const submitGenerateKey = async (event) => {
		event.preventDefault();
		let length = keyLength;

		let keypair = pki.rsa.generateKeyPair({ bits: 2048, e: 0x10001 });

		let pemPublicKey = pki.publicKeyToPem(keypair.publicKey);
		let pemPrivateKey = pki.privateKeyToPem(keypair.privateKey);

		await axios
			.post(
				'http://localhost:8080/api/keys/new/users/me',
				{
					name: formState.inputs.keyname.value,
					type: 'RSA',
					length: 2048,
					publicKey: pemPublicKey,
					privateKey: pemPrivateKey,
				},
				authHeader
			)
			.then((response) => {
				console.log(response);
				setStatus(response.data.message);
				setError('');
			})
			.catch((err) => {
				console.log(err);
				setError(err.response.data.message);
				setStatus('');
			});
	};

	return (
		<Segment style={{ maxWidth: 400, minWidth: 400, padding: '1.5rem' }}>
			<Header as='h2' dividing content='Generate a keypair' />
			<Form onSubmit={submitGenerateKey}>
				<Form.Field>
					<p style={{ paddingBottom: '1rem' }}>
						Create a new key with desired length to add to your list.
					</p>
					<Input
						iconPosition='left'
						element='input'
						id='keyname'
						type='text'
						label='Key name'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a name for the key.'
						onInput={inputHandler}
						placeholder='Key name'
					/>
				</Form.Field>
				<Form.Select
					label='Type'
					defaultValue={typeOptions[0].value}
					options={typeOptions}
				></Form.Select>
				<Form.Select
					label='Length'
					defaultValue={lengthOptions[2].value}
					onChange={(e) => setKeyLength(e.target.value)}
					onBlur={(e) => setKeyLength(e.target.value)}
					options={lengthOptions}
				></Form.Select>
				<Button type='submit' positive disabled={!formState.isValid}>
					Generate
				</Button>
			</Form>
		</Segment>
	);
};

export default GenerateKey;
