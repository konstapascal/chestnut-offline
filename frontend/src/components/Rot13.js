import React, { useState, useEffect } from 'react';
import { Form, TextArea, Button } from 'semantic-ui-react';

const Rot13 = () => {
	const [userInput, setUserInput] = useState('');
	const [rotData, setRotData] = useState('');

	useEffect(() => {
		let rot;
		rot = userInput.replace(/[a-zA-Z]/g, function (c) {
			return String.fromCharCode(
				(c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26
			);
		});
		console.log(rot);
		setRotData(rot);
	}, [userInput]);

	return (
		<div style={{ margin: '2.5rem' }}>
			<h3>Rot13</h3>
			<p>Simple conversion of plain text to ROT13 text.</p>
			<Form>
				<TextArea
					placeholder='Write or paste you text here...'
					style={{ minHeight: 100 }}
					onChange={(e) => setUserInput(e.target.value)}
				/>
				<br />
				<br />
				<TextArea
					disabled
					placeholder='Response goes here...'
					value={rotData}
					style={{ minHeight: 100 }}
				/>
			</Form>
		</div>
	);
};

export default Rot13;
