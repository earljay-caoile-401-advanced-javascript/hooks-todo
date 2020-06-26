import React, { useEffect, useState } from 'react';
import TodoItem from './ToDoItem';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ToDoList(props) {
  const [incompleteTasks, setIncompleteTasks] = useState(0);
  const [tasksToRender, setTasksToRender] = useState([]);

  let numIncomplete = 0;

  function updateOneCheckbox(checkStatus, index) {
    console.log('Did we make it here?', checkStatus, index);
    console.log('Does tasks arr even having anything?', tasksToRender);
    console.log('What is tasksCopy at index?', tasksToRender[index]);
  }

  useEffect(() => {
    const tmpTasksArr = [];
    if (props.tasks) {
      console.log('What is props.tasks at beginning of if?', props.tasks);
      for (let i = 0; i < props.tasks.length; i++) {
        const currTask = props.tasks[i];
        console.log('sanity check index:', i);
        console.log('Do we have a currTask?', currTask);
        tmpTasksArr.push(
          <TodoItem
            key={i}
            task={currTask}
            index={i}
            onChange={updateOneCheckbox}
          />
        );

        if (!currTask.wasCompleted) {
          numIncomplete++;
        }
      }

      setIncompleteTasks(numIncomplete);
      setTasksToRender(tmpTasksArr);
    }
    console.log('What is in tasksToRender?', tasksToRender);
    document.title = `ToDo: ${incompleteTasks} tasks incomplete`;
    console.log('What are props at end of useEffect?', props);
  }, []);

  return tasksToRender.length ? (
    <>
      <h2>ToDo List Page</h2>
      <div>{tasksToRender}</div>
    </>
  ) : (
    <>
      <h2>ToDo List Page</h2>
      <p>
        No tasks to show! Please return to the home page to add a task to the
        todo list.
      </p>
      <Link to="/">
        <Button variant="info">Return to Form Page</Button>
      </Link>
    </>
  );
}

export default ToDoList;
