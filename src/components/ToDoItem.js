import React, { useContext } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import If from './If';
import { CrudContext } from './Contexts';
/**
 * component representing a single ToDo item
 * used as a child component of the ToDoList component
 *
 * @component
 * @example
 * return (
 *   <TodoItem
 *     key="0"
 *     data={
 *        text: 'cook green eggs and ham'
 *        assignee: 'Sam I Am',
 *        difficulty: 3,
 *        complete: false
 *      }
 *     index="0"
 *     onChange={updateOneCheckbox}
    />
 * )
 */
function TodoItem(props) {
  const crudFunctions = useContext(CrudContext);

  function handleCheckbox(e) {
    const taskCopy = { ...props.data };
    taskCopy.complete = e.target.checked;
    crudFunctions.editTask(parseInt(props.index), taskCopy);
  }

  return (
    <If condition={props && props.data}>
      <div className="mt-4 mb-4 todo-item-container">
        <Card>
          <Card.Header>Task {props.index + 1}</Card.Header>
          <div className="card-body-group">
            <Card.Body className="task-info">
              <Card.Text>description: {props.data.text}</Card.Text>
              <Card.Text>assigned to: {props.data.assignee}</Card.Text>
              <Card.Text>difficulty: {props.data.difficulty}</Card.Text>
              <Form.Check
                type="checkbox"
                label="completed"
                checked={props.data.complete}
                id={'task-checkbox-' + props.index}
                onChange={handleCheckbox}
              />
            </Card.Body>
            <Card.Body className="delete-btn-body">
              <Button
                variant="danger"
                onClick={() =>
                  crudFunctions.deleteTask(
                    props.index,
                    parseInt(props.numIncomplete)
                  )
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
