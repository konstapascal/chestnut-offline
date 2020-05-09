import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Form, List, Message, Icon } from 'semantic-ui-react';

const UuidGenerator = () => {
	const [generatedUuids, setGeneratedUuids] = useState([]);
	const [number, setNumber] = useState(0);
	const [errorMessage, setErrorMessage] = useState('');

	const generateUuid = () => {
		setErrorMessage('');

		const uuids = [];

		if (number <= 0 || number > 100) {
			setErrorMessage('Choose an amount between 1 and 100.');
			setGeneratedUuids([]);
			return;
		} else {
			let index;
			let uuidGen = '';

			for (index = 0; index < number; index++) {
				uuidGen = uuid();
				uuids.push(uuidGen);
			}
		}

		setGeneratedUuids(uuids);
	};

	return (
		<div style={{ margin: '1.5rem' }}>
			<Form>
				<Form.Input
					type='number'
					fluid
					placeholder='Max 100'
					label='UUID amount:'
					focus
					onChange={(e) => {
						setNumber(e.target.value);
					}}
				/>
				<Form.Button type='button' color='green' onClick={generateUuid}>
					Generate
				</Form.Button>
				{errorMessage && (
					<Message error visible>
						<Icon color='red' name='times' size='large' />
						{errorMessage}
					</Message>
				)}
				<List style={{ marginTop: '2rem' }}>
					{generatedUuids.map((item) => (
						<List.Item key={item}>{item}</List.Item>
					))}
				</List>
			</Form>
		</div>
	);
};

export default UuidGenerator;
