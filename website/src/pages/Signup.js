import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { useState, useEffect } from "react";

export function Signup(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  useEffect(() => {
    if (email.indexOf("@") > 0) {
      setValidEmail(true);
    }
  }, [email]);

  useEffect(() => {
    if (password.length >= 8) {
      setValidPassword(true);
    }
  }, [password]);

  return (
    <Container fluid>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <Form>
            <h3>Sign up for an account</h3>
            <Form.Group>
              <Form.Label>Email adress</Form.Label>
              <Form.Control
                type="email"
                placeholder="email@domain.com"
                onChange={(evt) => setEmail(evt.target.value)}
                value={email}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="min 8 characters"
                onChange={(evt) => setPassword(evt.target.value)}
                value={password}
              />
            </Form.Group>
            <br />
            <Button
              variant="primary"
              type="submit"
              className="my-2 w-100"
              size="lg"
              disabled={validEmail && validPassword ? false : true}
            >
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
