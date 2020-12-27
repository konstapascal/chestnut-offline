import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Form, List, Message, Icon } from 'semantic-ui-react';
import UuidTooltip from './Tooltips/UuidTooltip';

const UuidGenerator = () => {
	const [generatedUuids, setGeneratedUuids] = useState([]);
	const [number, setNumber] = useState(0);
	const [errorMessage, setErrorMessage] = useState('');

	const generateUuid = () => {
		setErrorMessage('');

		const uuids = [];

		if (number <= 0 || number > 50) {
			setErrorMessage('Choose an amount between 1 and 50.');
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
			<UuidTooltip />
			<Form>
				<Form.Input
					type='number'
					fluid
					placeholder='Max 50'
					label='How many UUID do you want to generate?'
					focus
					onChange={e => {
						setNumber(e.target.value);
					}}
				/>
				<Form.Button
					type='button'
					style={{
						backgroundColor: '#14872f'
					}}
					onClick={generateUuid}>
					<p style={{ color: '#FFF' }}>Generate</p>
				</Form.Button>
				{errorMessage && (
					<Message error visible>
						<Icon color='red' name='times' size='large' />
						{errorMessage}
					</Message>
				)}
				<List style={{ marginTop: '2rem' }}>
					{generatedUuids.map(item => (
						<List.Item key={item}>{item}</List.Item>
					))}
				</List>
			</Form>
		</div>
	);
};

export default UuidGenerator;
