import React, { useState, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../context/auth-context";
import { useForm } from "../hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../util/validators";
import Input from "./FromElements/Input";

import { Form, Button, Segment, Message } from "semantic-ui-react";

const Login = () => {
  const auth = useContext(AuthContext);
  // const [error, setError] = useState();

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
};

export default Login;
