import React, { useEffect, useState } from 'react';
import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';
import { Route } from 'react-router-dom';
import '../styles/todo.scss';

/**
 * component that renders the TodoForm or ToDoList components based on route
 * child component of the main App component
 *
 * @component
 * @example
 * return (
 *   <ToDo />
 * )
 */
function ToDo() {
  const [tasks, setTasks] = useState([]);

  function addTask(newTask) {
    setTasks([...tasks, newTask]);
  }

  function editTask(index, updatedTask) {
    const tasksCopy = [...tasks];
    tasksCopy[index] = updatedTask;
    setTasks(tasksCopy);
  }

  useEffect(() => {
    let numIncomplete = 0;

    for (let i = 0; i < tasks.length; i++) {
      if (!tasks[i].complete) {
        numIncomplete++;
      }
    }

    document.title = `ToDo: ${numIncomplete} ${
      numIncomplete === 1 ? 'task' : 'tasks'
    } incomplete`;
  }, [tasks]);

  return (
    <div id="main-content">
      <Route path="/" exact>
        <ToDoForm addTask={addTask} />
      </Route>
      <Route path="/tasks" exact>
        <ToDoList tasks={tasks} editTask={editTask} />
      </Route>
    </div>
  );
}

export default ToDo;
