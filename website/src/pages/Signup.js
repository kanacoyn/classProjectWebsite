import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export function Signup(props) {
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
                onChange={(evt) => console.log(evt.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="min 8 characters" />
            </Form.Group>
            <br />
            <Button
              variant="primary"
              type="submit"
              className="my-2 w-100"
              size="lg"
            >
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
