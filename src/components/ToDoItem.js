import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
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
 *        text: 'cook green eggs and ham'
 *        assignee: 'Sam I Am',
 *        difficulty: 3,
 *        wasCompleted: false
 *      }
 *     index="0"
 *     onChange={updateOneCheckbox}
    />
 * )
 */
function TodoItem(props) {
  const [complete, setCompleted] = useState(
    props && props.task ? props.task.complete : null
  );

  function handleCheckbox(e) {
    setCompleted(e.target.checked);
    const taskCopy = { ...props.task };
    taskCopy.complete = e.target.checked;
    props.editTask(parseInt(props.index), taskCopy);
  }

  return (
    <If condition={props && props.task}>
      <div className="mt-4 mb-4 todo-item-container">
        <Card>
          <Card.Header>Task {props.index + 1}</Card.Header>
          <div className="card-body-group">
            <Card.Body className="task-info">
              <Card.Text>description: {props.task.text}</Card.Text>
              <Card.Text>assigned to: {props.task.assignee}</Card.Text>
              <Card.Text>difficulty: {props.task.difficulty}</Card.Text>
              <Form.Check
                type="checkbox"
                label="completed"
                checked={complete}
                id={props.index}
                onChange={handleCheckbox}
              />
            </Card.Body>
            <Card.Body className="delete-btn-body">
              <Button
                variant="danger"
                onClick={() =>
                  props.deleteTask(props.index, parseInt(props.numIncomplete))
                }
              >
                Delete
              </Button>
            </Card.Body>
          </div>
        </Card>
      </div>
    </If>
  );
}

export default TodoItem;
