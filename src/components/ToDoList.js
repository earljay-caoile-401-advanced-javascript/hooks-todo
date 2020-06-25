import React, { useEffect, useState } from 'react';
import TodoItem from './ToDoItem';

function ToDoList(props) {
  const [incompleteTasks, setIncompleteTasks] = useState(0);

  // function updateTitle() {
  //   document.title = `ToDo: ${incompleteTasks} tasks incomplete`;
  // }

  useEffect(() => {
    console.log('What is props.tasks?', props.tasks);
    let numIncomplete = 0;

    for (const task of props.tasks) {
      if (!task.wasCompleted) {
        numIncomplete++;
      }
    }

    setIncompleteTasks(numIncomplete);

    document.title = `ToDo: ${incompleteTasks} tasks incomplete`;
    console.log(
      'incompleteTasks before useEffect return statement:',
      incompleteTasks
    );

    // return () => {
    //   console.log('unmount');
    // };
  });

  return (
    <>
      <h2>ToDo List Page</h2>
    </>
  );
}

export default ToDoList;
