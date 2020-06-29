import React, { useEffect, useState } from 'react';
import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';
import { Route } from 'react-router-dom';
import '../styles/todo.scss';
import useFetch from '../hooks/useFetch';

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
  const [numIncomplete, setNumIncomplete] = useState(0);

  const { setUrl, setRequest, request, isLoading, error, response } = useFetch(
    'https://cf-js-401-api-server.herokuapp.com/api/v1/todo'
  );

  function addTask(newTask) {
    setTasks([...tasks, newTask]);
  }

  function editTask(index, updatedTask, currIncomplete) {
    const tasksCopy = [...tasks];
    tasksCopy[index] = updatedTask;
    setNumIncomplete(
      updatedTask.complete ? currIncomplete - 1 : currIncomplete + 1
    );
    setTasks(tasksCopy);

    const filteredTask = {
      assignee: updatedTask.assignee,
      complete: updatedTask.complete,
      difficulty: updatedTask.difficulty,
      text: updatedTask.text,
    };

    const requestBody = {
      method: 'PUT',
      body: filteredTask,
    };

    setUrl(
      `https://cf-js-401-api-server.herokuapp.com/api/v1/todo/${updatedTask.id}`
    );
    setRequest(requestBody);
  }

  useEffect(() => {
    document.title = `ToDo: ${numIncomplete} ${
      numIncomplete === 1 ? 'task' : 'tasks'
    } incomplete`;
  }, [numIncomplete]);

  useEffect(() => {
    if (response) {
      switch (request.method) {
        case 'POST':
          console.log('hitting put');
          break;
        case 'PUT':
          console.log('hitting put');
          console.log('What is our response on case PUT?', response);
          break;
        case 'PATCH':
          console.log('hitting patch');
          break;
        case 'DELETE':
          console.log('hitting delete');
          break;
        default:
          console.log('in the default for switch statement');
          const tasksCopy = [];
          let incompCounter = 0;
          if (response && response.results) {
            for (let i = 0; i < response.results.length; i++) {
              const result = response.results[i];
              tasksCopy.push({
                id: result._id,
                assignee: result.assignee,
                complete: result.complete,
                difficulty: result.difficulty,
                text: result.text,
              });

              if (!result.complete) {
                incompCounter++;
              }
            }

            setNumIncomplete(incompCounter);
            setTasks(tasksCopy);
          }
          break;
      }
    }
  }, [response]);

  return (
    <div id="main-content">
      <Route path="/" exact>
        <ToDoForm addTask={addTask} />
      </Route>
      <Route path="/tasks" exact>
        <ToDoList
          numIncomplete={numIncomplete}
          isLoading={isLoading}
          error={error}
          tasks={tasks}
          editTask={editTask}
        />
      </Route>
    </div>
  );
}

export default ToDo;
