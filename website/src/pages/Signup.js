import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { useState, useEffect, useContext } from "react";
import { FBAuthContext } from "../contexts/FBAuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FBDBContext } from "../contexts/FBDBContext";
import { useNavigate } from "react-router-dom";

export function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [userNameFeedback, setUsernameFeedback] = useState();

  const FBDB = useContext(FBDBContext);
  const FBAuth = useContext(FBAuthContext);
  const navigate = useNavigate();

  const allowedChars = Array.from("abcdefghijklmnopqrstuvwxyz1234567890_");
  let timer;

  const checkUser = async (user) => {
    const ref = doc(FBDB, "usernames", user);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      //user already exists
      setValidUsername(false);
      setUsernameFeedback("username is already taken");
    } else {
      //user doesn't exists
      setValidUsername(true);
      setUsernameFeedback(null);
    }
  };

  useEffect(() => {
    let userLength = false;
    let illegalChars = [];

    if (username.length < 5) {
      userLength = false;
    } else {
      userLength = true;
    }

    //check if username is made of allowed chars
    const chars = Array.from(username);
    chars.forEach((chr) => {
      if (allowedChars.includes(chr) === false) {
        illegalChars.push(chr);
      }
    });
    //check if username does not exists in Firebase
    if (userLength === true && illegalChars.length === 0) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        checkUser(username);
      }, 1500);
    }
  }, [username]);

  useEffect(() => {
    if (email.indexOf("@") > 0) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  }, [email]);

  useEffect(() => {
    if (password.length >= 8) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  }, [password]);

  const AddUserName = async () => {
    await setDoc(doc(FBDB, "usernames", username), {
      name: username,
    });
  };

  const SignupHandler = () => {
    createUserWithEmailAndPassword(FBAuth, email, password)
      .then((user) => {
        //user is created in firebase
        AddUserName();
        navigate("/");
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <Form
            onSubmit={(evt) => {
              evt.preventDefault();
              SignupHandler();
            }}
          >
            <h3>Sign up for an account</h3>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="unique username"
                onChange={(evt) => setUsername(evt.target.value)}
                value={username}
              />
              <Form.Control.Feedback>Looks good</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                {userNameFeedback}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="you@domain.com"
                onChange={(evt) => setEmail(evt.target.value)}
                value={email}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="minimum 8 characters"
                onChange={(evt) => setPassword(evt.target.value)}
                value={password}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="my-2 w-100"
              size="lg"
              disabled={
                validEmail && validPassword && validUsername ? false : true
              }
            >
              Sign up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
