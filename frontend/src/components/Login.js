import React, { useState, useContext, Fragment } from 'react';
import axios from 'axios';

import { AuthContext } from '../context/auth-context';
import { useForm } from '../hooks/form-hook';
import { VALIDATOR_REQUIRE } from '../util/validators';
import Input from '../components/FormElements/Input';

import { Form, Button, Segment, Message, Icon } from 'semantic-ui-react';

const Login = ({ componentSwap }) => {
	const auth = useContext(AuthContext);

	const [errorMessage, setError] = useState('');

	const [formState, inputHandler] = useForm(
		{
			username: {
				value: '',
				isValid: false
			},
			password: {
				value: '',
				isValid: false
			}
		},
		false
	);

	const authSubmitHandler = async event => {
		event.preventDefault();
		await axios
			.post('http://localhost:8080/api/login', {
				username: formState.inputs.username.value,
				password: formState.inputs.password.value
			})
			.then(response => {
				auth.login(response.data.token);
			})
			.catch(err => {
				setError(err.response.data.message);
			});
	};

	return (
		<div
			style={{
				textAlign: 'center',
				maxWidth: '400px',
				minWidth: '200px',
				margin: 'auto'
			}}>
			<Segment>
				<h3 style={{ textAlign: 'center' }}>Log in to your account</h3>
				<hr />
				<Form onSubmit={authSubmitHandler}>
					<Form.Field>
						<Input
							element='input'
							id='username'
							label='Username'
							validators={[VALIDATOR_REQUIRE()]}
							errorText='Please enter your username.'
							onInput={inputHandler}
							placeholder='Username'
						/>
					</Form.Field>
					<Form.Field>
						<Input
							element='input'
							id='password'
							type='password'
							label='Password'
							validators={[VALIDATOR_REQUIRE()]}
							errorText='Please enter your password.'
							onInput={inputHandler}
							placeholder='Choose a password'
						/>
					</Form.Field>
					<Button
						type='submit'
						positive
						disabled={!formState.isValid}
						color='green'>
						Log in
					</Button>
					{errorMessage && (
						<Message error visible>
							<Icon color='red' name='times' size='large' />
							{errorMessage}
						</Message>
					)}
					<Message>
						Don't have an account?{' '}
						<a href='#' onClick={componentSwap}>
							Signup
						</a>
					</Message>
				</Form>
			</Segment>
		</div>
	);
};

export default Login;
