import { Container } from "react-bootstrap";
import Row from "react-bootstrap";
import Col from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { FBDBContext } from "../contexts/FBDBContext";
import { collection, getDocs } from "firebase/firestore";

export function Home() {
  const [data, setData] = useState([]);
  const FBDB = useContext(FBDBContext);

  const getData = async () => {
    //get data from firebase collection called "books"
    const querySnapshot = await getDocs(collection(FBDB, "books"));
    //array to store all the books from firestore
    let books = [];

    querySnapshot.forEach((doc) => {
      let book = doc.data();
      book.id = doc.id;
      //add the book to the array
      books.push(book);
    });
    //set the books array as the data state
    setData(books);
  };

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
