import React, { useContext } from "react";
import axios from "axios";

import { AuthContext } from "../context/auth-context";
import { useForm } from "../hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../util/validators";
import Input from "./FormElements/Input";

import { Form, Button, Message, Segment } from "semantic-ui-react";

const Signup = () => {
  const auth = useContext(AuthContext);
  // const [error, setError] = useState();

  const [formState, inputHandler] = useForm(
    {
      email: {
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
      .post("http://localhost:8080/api/signup", {
        username: formState.inputs.username.value,
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      })
      .then((response) => {
        console.log(response);
        auth.login(response.data.id, response.data.token);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <React.Fragment>
      <Segment style={{ textAlign: "center", maxWidth: 450 }}>
        <h3 style={{ textAlign: "center" }}>Don't have an account?</h3>
        <hr />
        <Form onSubmit={authSubmitHandler}>
          <Form.Field>
            <Input
              iconPosition="left"
              element="input"
              id="username"
              type="text"
              label="Your username"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a username."
              onInput={inputHandler}
              placeholder="Username"
            />
          </Form.Field>
          <Form.Field>
            <Input
              element="input"
              id="email"
              type="email"
              label="E-Mail"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email address."
              onInput={inputHandler}
              placeholder="E-mail"
            />
          </Form.Field>
          <Form.Field>
            <Input
              element="input"
              id="password"
              type="password"
              label="Password"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid password, at least 5 characters."
              onInput={inputHandler}
              placeholder="Choose a password"
            />
          </Form.Field>
          <Button type="submit" positive disabled={!formState.isValid}>
            Signup
          </Button>
          <Message>
            Already have an account? <a href="/Login">Login here</a>
          </Message>
        </Form>
      </Segment>
    </React.Fragment>
  );
};

export default Signup;
