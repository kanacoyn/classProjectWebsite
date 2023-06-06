import Form from "react-bootstrap/Form";
export function ReviewForm(props) {
  if (props.user) {
    return (
      <Form>
        <Form.Group></Form.Group>
      </Form>
    );
  }
}
