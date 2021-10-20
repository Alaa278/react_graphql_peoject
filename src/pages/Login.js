import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation,gql } from "@apollo/react-hooks";

const Login = (props) => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    devices: "",
  });
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.login);
      props.history.push("/home")
    }  
  });
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    loginUser({
      variables: {
        input: {
          username: values.username,
          password: values.password,
          device: values.devices,
        },
      },
    });
  };

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
        />
        <Form.Input
          label="device "
          placeholder="device.."
          name="devices"
          type="text"
          value={values.device}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
    </div>
  );
};

const LOGIN_USER = gql`
  mutation login($input: LoginInput!) {
    login(input: $input)
  }
`;

export default Login;
