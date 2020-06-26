import React, { useEffect, useState } from 'react';
import TodoItem from './ToDoItem';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ToDoList(props) {
  const [incompleteTasks, setIncompleteTasks] = useState(0);
  const [tasksToRender, setTasksToRender] = useState([]);

  const localTaskArr = [];
  let numIncomplete = 0;

  function updateOneCheckbox(checkStatus, index) {
    console.log('Did we make it here?', checkStatus, index);
    // console.log('Does tasks arr even having anything?', tasksToRender);
    // console.log('how about dat tmp arr?', localTaskArr);

    // console.log('What is dat tmp arr at index?', localTaskArr[index]);
    const renderToUpdate = localTaskArr[index];
    renderToUpdate.props.task.wasCompleted = checkStatus;
    if (checkStatus) {
      numIncomplete--;
    } else {
      numIncomplete++;
    }

    console.log('What is numIncomplete now?', numIncomplete);
    setIncompleteTasks(numIncomplete);
    setTasksToRender(localTaskArr);
  }

  useEffect(() => {
    if (props.tasks) {
      console.log('What is props.tasks at beginning of if?', props.tasks);
      for (let i = 0; i < props.tasks.length; i++) {
        const currTask = props.tasks[i];
        console.log('sanity check index:', i);
        console.log('Do we have a currTask?', currTask);
        localTaskArr.push(
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
      setTasksToRender(localTaskArr);
    }
  }, []);

  useEffect(() => {
    document.title = `ToDo: ${incompleteTasks} tasks incomplete`;
  }, [incompleteTasks]);

  useEffect(() => {
    console.log('What is tasksToRender?', tasksToRender);
  }, [tasksToRender]);

  return (
    <>
      <h2>ToDo List Page</h2>
      <>
        {tasksToRender.length ? (
          <div>{tasksToRender}</div>
        ) : (
          <>
            <p>
              No tasks to show! Please return to the home page to add a task to
              the todo list.
            </p>
            <Link to="/">
              <Button variant="info">Return to Form Page</Button>
            </Link>
          </>
        )}
      </>
    </>
  );
}

export default ToDoList;
