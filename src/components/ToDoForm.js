import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

function ToDoForm(props) {
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignment] = useState('');
  const [difficulty, setDifficulty] = useState(1);
  const [wasCompleted, setCompleted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmitBtn() {
    props.onSubmit({
      description,
      assignedTo,
      difficulty,
      wasCompleted,
    });

    setSubmitted(true);
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      handleSubmitBtn();
    }
  }

  return submitted ? (
    <Redirect push to="/tasks" />
  ) : (
    <>
      <h2 className="text-center mb-4">ToDo Form Page</h2>
      <Form>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Task</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="wash dishes"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Bob Saget"
            onChange={(e) => setAssignment(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Difficulty</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => setDifficulty(parseInt(e.target.value))}
          >
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
            className="large-checkbox"
            onChange={() => setCompleted(!wasCompleted)}
          />
        </Form.Group>
        <Button variant="info" onClick={handleSubmitBtn}>
          Submit
        </Button>
      </Form>
    </>
  );
}

export default ToDoForm;
