import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useParams } from "react-router-dom";

import { useContext, useState, useEffect } from "react";
import { FBDBContext } from "../contexts/FBDBContext";
import { FBStorageContext } from "../contexts/FBStorageContext";
import { AuthContext } from "../contexts/AuthContexts";
import { doc, getDoc } from "firebase/firestore";

export function Detail(props) {
  const [bookData, setBookData] = useState();
  let { bookId } = useParams();

  const FBDB = useContext(FBDBContext);
  const bookRef = doc(FBDB, "books", bookId);

  const getBook = async () => {
    let book = await getDoc(bookRef);
    if (book.exists()) {
      setBookData(book);
    } else {
      console.log("no data");
    }
  };

  useEffect(() => {
    if (!bookData) {
      getBook(bookId);
    }
  });

  if (bookData) {
    return (
      <Container>
        <Row>
          <Col>
            <h1>{bookId}</h1>
          </Col>
          <Col>Right</Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container>
        <Row>
          <Col>Loading</Col>
        </Row>
      </Container>
    );
  }
}
