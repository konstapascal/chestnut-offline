import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import ChecksumTooltip from './Tooltips/ChecksumTooltip';

var forge = require('node-forge');

const Checksum = () => {
	const [userInput, setUserInput] = useState('');
	const [md5Hash, setMD5Hash] = useState('');
	const [sha1Hash, setSHA1Hash] = useState('');
	const [sha256Hash, setSHA256] = useState('');
	const [sha512Hash, setSHA512] = useState('');

	const uploadHandler = e => {
		const reader = new FileReader();

		reader.onload = function () {
			setUserInput(reader.result);
		};

		reader.readAsBinaryString(e.target.files[0]);
	};

	useEffect(() => {
		if (userInput === '') return;

		let md5Hasher = forge.md.md5.create();
		md5Hasher.update(userInput);
		setMD5Hash(md5Hasher.digest().toHex());

		let sha1Hasher = forge.md.sha1.create();
		sha1Hasher.update(userInput);
		setSHA1Hash(sha1Hasher.digest().toHex());

		let sha256Hasher = forge.md.sha256.create();
		sha256Hasher.update(userInput);
		setSHA256(sha256Hasher.digest().toHex());

		let sha512Hasher = forge.md.sha512.create();
		sha512Hasher.update(userInput);
		setSHA512(sha512Hasher.digest().toHex());
	}, [userInput]);

	return (
		<div style={{ margin: '1.5rem' }}>
			<ChecksumTooltip />
			<p>
				Write or paste in plain text in the first area or choose a .txt file
				to generate hash values based on its content.
			</p>
			<Form>
				<Form.TextArea
					style={{ minHeight: 100 }}
					spellCheck={false}
					type='text'
					label='Text to checksum:'
					value={userInput}
					onChange={e => {
						setUserInput(e.target.value);
					}}
				/>
				<Form.Input
					type='file'
					accept='text/plain'
					onChange={uploadHandler}
				/>
				<Form.Input spellCheck={false} value={md5Hash} label='MD5' />
				<Form.Input spellCheck={false} value={sha1Hash} label='SHA-1' />
				<Form.Input spellCheck={false} value={sha256Hash} label='SHA-256' />
				<Form.Input spellCheck={false} value={sha512Hash} label='SHA-512' />
			</Form>
		</div>
	);
};

export default Checksum;
