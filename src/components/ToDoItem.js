import React, { useEffect, useState } from 'react';
import { ListGroup, Card, Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

function TodoItem(props) {
  console.log('props at beginning of TodoItem', props);
  // const taskToRender = useState([]);
  // console.log('props.task inside useEffect:', props.task);
  // Object.keys(props.task).forEach((key, i) => {
  //   taskToRender.push(
  //     <Card.Text key={i}>
  //       {key}: {props.task[key] || false}
  //     </Card.Text>
  //   );
  // });

  function handleCheckbox(e) {
    console.log('do we have a checked prop?', e.target.checked);
    props.onChange(e.target.checked, parseInt(props.key) - 1);
  }

  return (
    <div className="mt-2 mb-2">
      <Card>
        <Card.Header>Task {props.taskNum}</Card.Header>
        <Card.Body>
          {/* <>{taskToRender}</> */}
          <Card.Text>Description: {props.task.description}</Card.Text>
          <Card.Text>Assigned to: {props.task.assignedTo}</Card.Text>
          <Card.Text>Difficulty: {props.task.difficulty}</Card.Text>
          <Form.Check
            type="checkbox"
            label="Completed"
            checked={props.task.wasCompleted}
            onChange={handleCheckbox}
          />
        </Card.Body>
      </Card>
    </div>
  );
}

export default TodoItem;
