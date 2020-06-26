import React, { useEffect, useState } from 'react';
import TodoItem from './ToDoItem';

function ToDoList(props) {
  const [incompleteTasks, setIncompleteTasks] = useState(0);
  const [tasksToRender, setTasksToRender] = useState([]);

  // function updateTitle() {
  //   document.title = `ToDo: ${incompleteTasks} tasks incomplete`;
  // }
  // const tasksToRender = [];

  // const tasksToRender = [];
  useEffect(() => {
    let numIncomplete = 0;
    if (props.tasks) {
      console.log('What is props.tasks at beginning of if?', props.tasks);
      for (let i = 0; i < props.tasks.length; i++) {
        const currTask = props.tasks[i];
        console.log('sanity check index:', i);
        console.log('Do we have a currTask?', currTask);
        tasksToRender.push(<TodoItem key={i} task={currTask} />);

        if (!currTask.wasCompleted) {
          numIncomplete++;
        }
      }

      setIncompleteTasks(numIncomplete);
      // setTasksToRender(tasks);
    }
    console.log('What is in tasksToRender?', tasksToRender);
    document.title = `ToDo: ${incompleteTasks} tasks incomplete`;
    console.log('What are props at end of useEffect?', props);
  }, [incompleteTasks, tasksToRender]);

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
    </>
  );

  // return (
  //   <>
  //     <h2>ToDo List Page</h2>
  //     <div>{tasksToRender}</div>
  //   </>
  // );
}

export default ToDoList;
