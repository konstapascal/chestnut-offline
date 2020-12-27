import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import EncryptionTooltip from './Tooltips/EncryptionTooltip';

var forge = require('node-forge');

const AesEncryption = () => {
	const [userInput, setUserInput] = useState('');
	const [aesEncrypted, setAesEncrypted] = useState('');
	const [userPassword, setUserPassword] = useState('');

	useEffect(() => {
		const encrypt = () => {
			let exampleString = userInput;

			// the password used for derviation of a key, assign your password here
			// if none is assigned a random one is generated
			let password = userPassword;
			if (password === '' || userInput === '') {
				return;
			}

			let salt = 'this is my salt';
			let key = forge.pkcs5.pbkdf2(password, salt, 300, 32);

			let iv = 'this is my vector';

			// ENCRYPT the text
			let cipher = forge.cipher.createCipher('AES-CBC', key);
			cipher.start({ iv: iv });
			cipher.update(forge.util.createBuffer(exampleString));
			cipher.finish();

			let encrypted = forge.util.encode64(cipher.output.data);

			setAesEncrypted(encrypted);
		};

		encrypt();
	}, [userInput, userPassword]);

	return (
		<div style={{ margin: '1.5rem' }}>
			<EncryptionTooltip />
			<p>
				Write plain text in the first area and it will be encrypted using
				the AES algorithm and your chosen password.
			</p>

			<Form>
				<Form.Input
					label='Enter your password here:'
					type='text'
					flucid='true'
					onChange={e => setUserPassword(e.target.value)}
				/>
				<Form.TextArea
					placeholder='Write or paste your text here...'
					style={{ minHeight: 100 }}
					onChange={e => setUserInput(e.target.value)}
				/>
				<Form.TextArea
					readOnly
					placeholder='Ecrypted text appears here...'
					value={aesEncrypted}
					style={{ minHeight: 100 }}
				/>
			</Form>
		</div>
	);
};

export default AesEncryption;
