import React, { useState, useContext } from 'react';
import axios from 'axios';

import { AuthContext } from '../context/auth-context';
import { useForm } from '../hooks/form-hook';
import { VALIDATOR_REQUIRE } from '../util/validators';
import Input from '../components/FormElements/Input';

import { Form, Button, Segment, Message } from 'semantic-ui-react';

const Login = (props) => {
	const auth = useContext(AuthContext);

	const [formState, inputHandler] = useForm(
		{
			username: {
				value: '',
				isValid: false,
			},
			password: {
				value: '',
				isValid: false,
			},
		},
		false
	);

	const authSubmitHandler = async (event) => {
		event.preventDefault();
		await axios
			.post('http://localhost:8080/api/login', {
				username: formState.inputs.username.value,
				password: formState.inputs.password.value,
			})
			.then((response) => {
				auth.login(response.data.token);
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	};

	const toggleComponent = () => {
		props.componentSwap();
	};

	return (
		<div>
			<Segment style={{ textAlign: 'center', maxWidth: 400, minWidth: 400 }}>
				<h3 style={{ textAlign: 'center' }}>Login to your account</h3>
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
					<Button type='submit' positive disabled={!formState.isValid}>
						Login
					</Button>
					<Message>
						Don't have an account?{' '}
						<a href='#' onClick={toggleComponent}>
							Signup
						</a>
					</Message>
				</Form>
			</Segment>
		</div>
	);
};

export default Login;
