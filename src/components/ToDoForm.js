import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

/**
 * component containing a form for a user to submit
 * redirects to the tasks page on submission
 * child component of the ToDo component
 *
 * @component
 * @example
 * return (
 *   <ToDoForm onSubmit={onSubmit} />
 * )
 */
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
      <h2 className="text-center mb-4">ToDo Form</h2>
      <Form>
        <Form.Group controlId="task-description">
          <Form.Label>Task</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="wash dishes"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="task-person">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Bob Saget"
            onChange={(e) => setAssignment(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </Form.Group>
        <Form.Group controlId="task-difficulty">
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
        <Form.Group controlId="task-completed" className="mt-4 mb-4">
          <Form.Check
            type="checkbox"
            id="task-completed-checkbox-form"
            label="Completed"
            className="large-checkbox"
            onChange={() => setCompleted(!wasCompleted)}
          />
        </Form.Group>
        <Button
          variant="info"
          className="btn-lg btn-block"
          onClick={handleSubmitBtn}
        >
          Submit
        </Button>
      </Form>
    </>
  );
}

export default ToDoForm;
