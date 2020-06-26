import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import If from './If';

/**
 * component representing a single ToDo item
 * used as a child component of the ToDoList component
 *
 * @component
 * @example
 * return (
 *   <TodoItem
 *     key="0"
 *     task={
 *        description: 'cook green eggs and ham'
 *        assignedTo: 'Sam I Am',
 *        difficulty: 3,
 *        wasCompleted: false
 *      }
 *     index="0"
 *     onChange={updateOneCheckbox}
    />
 * )
 */
function TodoItem(props) {
  const [wasCompleted, setCompleted] = useState(
    props && props.task ? props.task.wasCompleted : null
  );

  function handleCheckbox(e) {
    setCompleted(e.target.checked);
    props.onChange(e.target.checked, parseInt(props.index));
  }

  return (
    <If condition={props && props.task}>
      <div className="mt-4 mb-4 todo-item-container">
        <Card>
          <Card.Header>Task {props.index + 1}</Card.Header>
          <Card.Body>
            <Card.Text>description: {props.task.description}</Card.Text>
            <Card.Text>assigned to: {props.task.assignedTo}</Card.Text>
            <Card.Text>difficulty: {props.task.difficulty}</Card.Text>
            <Form.Check
              type="checkbox"
              label="completed"
              checked={wasCompleted}
              onChange={handleCheckbox}
            />
          </Card.Body>
        </Card>
      </div>
    </If>
  );
}

export default TodoItem;
