import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

function TodoItem(props) {
  const [wasCompleted, setCompleted] = useState(props.task.wasCompleted);

  function handleCheckbox(e) {
    setCompleted(e.target.checked);
    props.onChange(e.target.checked, parseInt(props.index));
  }

  return (
    <div className="mt-4 mb-4">
      <Card>
        <Card.Header>Task {props.index + 1}</Card.Header>
        <Card.Body>
          <Card.Text>Description: {props.task.description}</Card.Text>
          <Card.Text>Assigned to: {props.task.assignedTo}</Card.Text>
          <Card.Text>Difficulty: {props.task.difficulty}</Card.Text>
          <Form.Check
            type="checkbox"
            label="Completed"
            checked={wasCompleted}
            onChange={handleCheckbox}
          />
        </Card.Body>
      </Card>
    </div>
  );
}

export default TodoItem;
