import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

export function ReviewForm(props) {
  const [stars, setStars] = useState(5);

  const SubmitHandler = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const reviewTitle = data.get("title");
    const reviewBody = data.get("body");
    props.handler({ title: reviewTitle, content: reviewBody });
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
            You have given this book
            {stars}
            Star out of 5
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
        <Button type="submit" variant="primary">
          Add Review
        </Button>
      </Form>
    );
  } else {
    return null;
  }
}
