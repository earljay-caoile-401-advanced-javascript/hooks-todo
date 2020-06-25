import React from 'react';
import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';
import { BrowserRouter, Route } from 'react-router-dom';

function ToDo() {
  return (
    <div id="main-content">
      <BrowserRouter>
        <Route path="/" exact>
          <ToDoForm />
        </Route>
        <Route path="/tasks" exact>
          <ToDoList />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default ToDo;
