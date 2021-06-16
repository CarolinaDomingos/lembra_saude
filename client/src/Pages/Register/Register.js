import React, { useState } from "react";
import { Form, Button, Container, Row } from "react-bootstrap"; //bootstrap for react
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nif: "",
    password: "",
  });

  //Send info to server and waits for response, if the user logs in or not.
  const regist = () => {};

  // add all the info in the formData object
  const handleData = (e) => {
    setFormData({});
  };
  return (
    <Container>
      <h1>SIGNUP PAGE</h1>
      <Row>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            {/* Input */}
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            {/* Input */}
            <Form.Control type="text" placeholder="Enter name" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>NIF</Form.Label>
            {/* Input */}
            <Form.Control type="number" placeholder="123 456 789" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            {/* Input */}
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            {/* Input */}
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default Register;
