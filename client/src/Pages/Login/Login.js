import React, { useState } from "react";
import { Form, Button, Container, Row } from "react-bootstrap"; //bootstrap for react
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nif: "",
    password: "",
  });

  //Send info to server and waits for response, if the user logs in or not.
  const submitLogin = () => {};

  // add all the info in the formData object
  const handleData = (e) => {
    setFormData({});
  };

  return (
    <Container>
      <h1>LOGIN PAGE</h1>
      <Row>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            {/* Input */}
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={handleData}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            {/* Input */}
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={handleData}
            />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Enter
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default Login;
