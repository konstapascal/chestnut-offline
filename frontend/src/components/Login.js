<<<<<<< HEAD
import React, { useState, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../context/auth-context";
import { useForm } from "../hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../util/validators";
import Input from "./FromElements/Input";

import { Form, Button, Segment, Message } from "semantic-ui-react";
=======
import React, { useContext } from 'react';
import axios from 'axios';
import { Form, Button, Segment, Message } from 'semantic-ui-react';
import { AuthContext } from '../context/auth-context';
import { useForm } from '../hooks/form-hook';
import Input from './FormElements/Input';
import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from '../util/validators';
>>>>>>> 3ec5db7344453192b1c7abcf4d1883e28acd0b69

const Login = () => {
	const auth = useContext(AuthContext);
	// const [error, setError] = useState();

<<<<<<< HEAD
  const [formState, inputHandler] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:8080/api/login", {
        // username: formState.inputs.username.value,
        username: formState.inputs.username.value,
        password: formState.inputs.password.value,
      })
      .then((response) => {
        console.log(response.data);
        auth.login();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <React.Fragment>
      <Segment style={{ textAlign: "center", maxWidth: 450 }}>
        <h3 style={{ textAlign: "center" }}>Login to your account</h3>
        <hr />
        <Form onSubmit={authSubmitHandler}>
          <Form.Field>
            <Input
              element="input"
              id="username"
              type="username"
              label="Username"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your username."
              onInput={inputHandler}
              placeholder="Username"
            />
          </Form.Field>
          <Form.Field>
            <Input
              element="input"
              id="password"
              type="password"
              label="Password"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your password."
              onInput={inputHandler}
              placeholder="Choose a password"
            />
          </Form.Field>
          <Button type="submit" positive disabled={!formState.isValid}>
            Login
          </Button>
          <Message>
            Don't have an account? <a href="/Signup">Signup</a>
          </Message>
        </Form>
      </Segment>
    </React.Fragment>
  );
=======
	const [formState, inputHandler] = useForm(
		{
			email: {
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
			.post('http://localhost:5000/api/users/login', {
				// userName: formState.inputs.userName.value,
				email: formState.inputs.email.value,
				password: formState.inputs.password.value,
			})
			.then((response) => {
				console.log(response);
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	};

	return (
		<React.Fragment>
			<Segment style={{ textAlign: 'center', maxWidth: 450 }}>
				<h3 style={{ textAlign: 'center' }}>Login to your account</h3>
				<hr />
				<Form onSubmit={authSubmitHandler}>
					<Form.Field>
						<Input
							element='input'
							id='email'
							type='email'
							label='E-Mail'
							validators={[VALIDATOR_EMAIL()]}
							errorText='Please enter a valid email address.'
							onInput={inputHandler}
							placeholder='E-mail'
						/>
					</Form.Field>
					<Form.Field>
						<Input
							element='input'
							id='password'
							type='password'
							label='Password'
							validators={[VALIDATOR_MINLENGTH(5)]}
							errorText='Please enter you password.'
							onInput={inputHandler}
							placeholder='Choose a password'
						/>
					</Form.Field>
					<Button type='submit' positive disabled={!formState.isValid}>
						Login
					</Button>
					<Message>
						Don't have an account? <a href='/Signup'>Signup</a>
					</Message>
				</Form>
			</Segment>
		</React.Fragment>
	);
>>>>>>> 3ec5db7344453192b1c7abcf4d1883e28acd0b69
};

export default Login;
