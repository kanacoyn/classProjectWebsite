import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";

export function ReviewForm(props) {
  const [stars, setStars] = useState(5);
  const [submit, setSubmit] = useState(false);

  const SubmitHandler = (event) => {
    event.preventDefault();
    setSubmit(true);
    const data = new FormData(event.target);
    const reviewTitle = data.get("title");
    const reviewBody = data.get("body");
    const reviewStars = data.get("stars");
    props.handler({
      title: reviewTitle,
      content: reviewBody,
      stars: reviewStars,
    });
  };

  const SubmitAlert = (props) => {
    if (props.show) {
      return <Alert variant="success">Thank you for submitting review!</Alert>;
    } else {
      return null;
    }
  };

  if (props.user) {
    return (
      <Form onSubmit={SubmitHandler}>
        <h4>Add a review for this book</h4>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Review Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="This book is amazing"
            name="title"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>
            You have given this book {stars}
            star out of 5
          </Form.Label>
          <Form.Range
            type="range"
            name="stars"
            step="0.5"
            min="1"
            max="5"
            value={stars}
            onChange={(evt) => setStars(evt.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Review Body</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="body"
            placeholder="I love this book"
          />
        </Form.Group>
        <SubmitAlert show={submit} />
        <Button
          type="submit"
          variant="primary"
          disabled={submit ? true : false}
        >
          Add Review
        </Button>
      </Form>
    );
  } else {
    return null;
  }
}
