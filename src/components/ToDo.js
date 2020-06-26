import React, { useState } from 'react';
import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';
import { Route } from 'react-router-dom';

function ToDo() {
  const tasks = useState([]);

  function onSubmit(task) {
    console.log('Here is the submitted task:', task);
    tasks.push(task);
    console.log('What are tasks now?', tasks);
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
