import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function ToDoForm(props) {
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignment] = useState('');

  return (
    <>
      <h2 className="text-center">ToDo Form Page</h2>
      <Form>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Task</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="washed the dishes"
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Bob Saget" />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Difficulty</Form.Label>
          <Form.Control as="select">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            id="task-completed-checkbox"
            label="Completed"
          />
        </Form.Group>
        <Button variant="info" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default ToDoForm;
