import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import Base64Tooltip from './Tooltips/Base64Tooltip';

var forge = require('node-forge');

const Base64Decoding = () => {
	const [userInput, setUserInput] = useState('');
	const [base64Decoded, setBase64Decoded] = useState('');

	useEffect(() => {
		const newBase64Decoded = forge.util.decode64(userInput);
		setBase64Decoded(newBase64Decoded);
	}, [userInput]);

	return (
		<div style={{ margin: '1.5rem' }}>
			<Base64Tooltip />
			<p>
				Paste in your Base64 encoded text in the first field and it will be
				automatically decoded.
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
					value={base64Decoded}
					style={{ minHeight: 100 }}
				/>
			</Form>
		</div>
	);
};

export default Base64Decoding;
