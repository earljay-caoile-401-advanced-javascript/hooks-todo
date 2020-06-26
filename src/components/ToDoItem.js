import React, { useEffect, useState } from 'react';

function TodoItem(props) {
  console.log('props at beginning of TodoItem', props);
  const taskToRender = useState([]);
  console.log('props.task inside useEffect:', props.task);
  Object.keys(props.task).forEach((key, i) => {
    taskToRender.push(
      <li key={i}>
        {key}: {props.task[key]}
      </li>
    );
  });

  return (
    <>
      <p>Did this work?</p>
      <ul>{taskToRender}</ul>
    </>
  );
}

export default TodoItem;
