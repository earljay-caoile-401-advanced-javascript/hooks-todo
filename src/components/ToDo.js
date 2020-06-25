import React from 'react';
import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';
import { Route } from 'react-router-dom';

function ToDo() {
  return (
    <div id="main-content">
      <Route path="/" exact>
        <ToDoForm />
      </Route>
      <Route path="/tasks" exact>
        <ToDoList />
      </Route>
    </div>
  );
}

export default ToDo;
