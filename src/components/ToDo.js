import React from 'react';
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
  const tasks = [];

  function onSubmit(task) {
    tasks.push(task);
  }

  return (
    <div id="main-content">
      <Route path="/" exact>
        <ToDoForm onSubmit={onSubmit} />
      </Route>
      <Route path="/tasks" exact>
        <ToDoList tasks={tasks} />
      </Route>
    </div>
  );
}

export default ToDo;
