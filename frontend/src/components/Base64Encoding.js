import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import Base64Tooltip from './Tooltips/Base64Tooltip';

var forge = require('node-forge');

const Base64Encoding = () => {
	const [userInput, setUserInput] = useState('');
	const [base64Encoded, setBase64Encoded] = useState('');

	useEffect(() => {
		const newBase64Encoded = forge.util.encode64(userInput);
		setBase64Encoded(newBase64Encoded);
	}, [userInput]);

	return (
		<div style={{ margin: '1.5rem' }}>
			<Base64Tooltip />
			<p>
				Write plain text in the first area and it will automatically be
				encoded into Base64.
			</p>
			<Form>
				<Form.TextArea
					placeholder='Write or paste your text here...'
					style={{ minHeight: 100 }}
					onChange={e => setUserInput(e.target.value)}
				/>
				<Form.TextArea
					readOnly
					placeholder='Encoded text appears here...'
					value={base64Encoded}
					style={{ minHeight: 100 }}
				/>
			</Form>
		</div>
	);
};

export default Base64Encoding;
