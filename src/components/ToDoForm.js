import React, { useState } from 'react';
import { Form, Button, Col, InputGroup } from 'react-bootstrap';
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
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      props.onSubmit({
        description,
        assignedTo,
        difficulty,
        wasCompleted,
      });

      setSubmitted(true);
    }

    setValidated(true);
  };

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  }

  return validated && submitted ? (
    <Redirect push to="/tasks" />
  ) : (
    <>
      <h2 className="text-center mb-4">ToDo Form</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="task-description">
          <Form.Label>Task</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="wash dishes"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a task description.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="task-person">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Bob Saget"
            onChange={(e) => setAssignment(e.target.value)}
            onKeyPress={handleKeyPress}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a task assignee.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Row>
          <Form.Group controlId="task-difficulty" as={Col} md="6">
            <Form.Label>Difficulty</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setDifficulty(parseInt(e.target.value))}
              required
              defaultValue=""
            >
              <option value="" disabled>
                Choose a difficulty...
              </option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please provide a task difficulty.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            controlId="task-completed"
            className="mt-2 mb-2 flex-centered"
            as={Col}
            md="6"
          >
            <Form.Check
              type="checkbox"
              id="task-completed-checkbox-form"
              label="Completed"
              className="large-checkbox mt-2"
              onChange={() => setCompleted(!wasCompleted)}
            />
          </Form.Group>
        </Form.Row>
        <Button
          variant="info"
          className="mt-4 mb-4 btn-lg btn-block"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </>
  );
}

export default ToDoForm;
