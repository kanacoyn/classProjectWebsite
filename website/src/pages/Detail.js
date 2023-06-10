import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import { ReviewForm } from "../components/ReviewForm";

import { useContext, useState, useEffect } from "react";
import { FBDBContext } from "../contexts/FBDBContext";
import { FBStorageContext } from "../contexts/FBStorageContext";
import { FBAuthContext } from "../contexts/FBAuthContext";

import { doc, getDoc, addDoc, collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function Detail(props) {
  const [bookData, setBookData] = useState();
  const [auth, setAuth] = useState();
  const [bookReviews, setBookReviews] = useState([]);

  let { bookId } = useParams();

  const FBDB = useContext(FBDBContext);
  const FBStorage = useContext(FBStorageContext);
  const FBAuth = useContext(FBAuthContext);

  onAuthStateChanged(FBAuth, (user) => {
    if (user) {
      //user is signed in
      setAuth(user);
    } else {
      //user is not signed in
      setAuth(null);
    }
  });

  const getReviews = async () => {
    const path = `books/${bookId}/reviews`;
    const querySnapshot = await getDocs(collection(FBDB, path));
    let reviews = [];
    querySnapshot.forEach((item) => {
      let review = item.data();
      review.id = item.id;
      reviews.push(review);
    });
    setBookReviews(reviews);
  };

  const bookRef = doc(FBDB, "books", bookId);

  const getBook = async (id) => {
    let book = await getDoc(bookRef);
    if (book.exists()) {
      setBookData(book.data());
    } else {
      // no book exists with the ID
    }
  };

  useEffect(() => {
    if (!bookData) {
      getBook(bookId);
    }
  });

  //function to handle review submission
  const reviewHandler = async (reviewData) => {
    //create a document inside firestore
    const path = `books/${bookId}/reviews`;
    const review = await addDoc(collection(FBDB, path), reviewData);
  };

  const Image = (props) => {
    const [imgPath, setImgPath] = useState();
    const imgRef = ref(FBStorage, `book_cover/${props.path}`);
    getDownloadURL(imgRef).then((url) => setImgPath(url));

    return <img src={imgPath} className="img-fluid" />;
  };

  if (bookData) {
    return (
      <Container>
        <Row className="my-3">
          <Col md="4">
            <Image path={bookData.image} />
          </Col>
          <Col>
            <h2>{bookData.title}</h2>
            <h4>{bookData.author}</h4>
            <p>{bookData.year}</p>
            <p>{bookData.summary}</p>
            <p>ISBN10 :{bookData.isbn10} </p>
            <p>ISBN13 :{bookData.isbn13}</p>
            <p>{bookData.pages} pages</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <ReviewForm user={auth} />
          </Col>
        </Row>
      </Container>
    );
  } else {
    return null;
  }
}
