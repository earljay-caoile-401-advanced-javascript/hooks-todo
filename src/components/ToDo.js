import React, { useEffect, useState } from 'react';
import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';
import { Route } from 'react-router-dom';
import '../styles/todo.scss';
import useFetch from '../hooks/useFetch';
import useForm from '../hooks/useForm';

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
  const baseUrl = 'https://cf-js-401-api-server.herokuapp.com/api/v1/todo';
  const baseData = {
    text: '',
    assignee: '',
    difficulty: null,
    complete: false,
  };

  const baseReq = {
    method: 'GET',
  };

  const { setUrl, setRequest, request, isLoading, error, response } = useFetch(
    baseUrl,
    baseReq
  );

  const { handleSubmit, handleChange, data, setData } = useForm(
    addTask,
    baseData
  );

  /**
   * helper function that adds a task to the ToDo list
   * makes a POST API fetch
   */
  function addTask() {
    const requestBody = {
      method: 'POST',
      body: data,
    };

    setUrl(baseUrl);
    setRequest(requestBody);
    setNumIncomplete(data.complete ? numIncomplete : numIncomplete + 1);
    setTasks([...tasks, data]);
    setData(baseData);
  }

  /**
   * helper function that edits an existing task
   * makes a PUT API fetch
   * currently only toggling checkbox complete status
   * @param {Number} index - index of the task object in the tasks array to edit
   * @param {Object} updatedTask - object with the updated task parameters
   */
  function editTask(index, updatedTask) {
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

    setUrl(baseUrl + `/${updatedTask.id}`);
    setRequest(requestBody);

    const tasksCopy = [...tasks];
    tasksCopy[index] = updatedTask;

    setNumIncomplete(
      updatedTask.complete ? numIncomplete - 1 : numIncomplete + 1
    );
    setTasks(tasksCopy);
  }

  /**
   * simple function that performs a GET fetch to grab all ToDo tasks
   * used in conjunction with the componentDidMount-like useEffect hook to re-render on a timer
   */
  function getTasks() {
    setUrl(baseUrl);
    setRequest(baseReq);
  }

  /**
   * helper function that deletes an existing task
   * makes a DELETE API fetch
   * @param {Number} deleteIndex - index of the task object to delete
   */
  function deleteTask(deleteIndex) {
    const taskToDelete = { ...tasks[deleteIndex] };

    const requestBody = {
      method: 'DELETE',
    };

    setUrl(baseUrl + `/${taskToDelete.id}`);
    setRequest(requestBody);

    if (!taskToDelete.complete) {
      setNumIncomplete(numIncomplete - 1);
    }

    const filteredArr = tasks.filter((task, index) => index !== deleteIndex);
    setTasks(filteredArr);
  }

  /**
   * simple hook that performs API GET fetch on a timer
   * currently set to re-fetch every 5 minutes
   */
  useEffect(() => {
    setInterval(() => {
      console.log('triggering a GET re-fetch');
      getTasks();
    }, 300000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * simple hook that console errors any error messages
   */
  useEffect(() => {
    if (error) {
      console.error('Uh oh, we got an error!', error);
    }
  }, [error]);

  /**
   * hook that triggers whenever numIncomplete gets updated to update the page title with
   * the current amount of incomplete tasks
   */
  useEffect(() => {
    document.title = `ToDo: ${numIncomplete} ${
      numIncomplete === 1 ? 'task' : 'tasks'
    } incomplete`;
  }, [numIncomplete]);

  /**
   * multi-purpose hook that triggers whenever a request or response triggers
   * probably not the most elegant solution, but it works...
   */
  useEffect(() => {
    let tasksCopy = [...tasks];
    let incompCounter = numIncomplete;

    if (response) {
      switch (request.method) {
        case 'POST':
          if (!isLoading && response) {
            const postIndex = tasksCopy.length ? tasksCopy.length - 1 : 0;
            if (response._id) {
              tasksCopy[postIndex].id = response._id;
            }
          }
          break;
        case 'PUT':
          console.log('triggered PUT');
          break;
        case 'PATCH':
          console.log('triggered PATCH');
          break;
        case 'DELETE':
          console.log('triggered DELETE');
          break;
        default:
          if (response.results) {
            tasksCopy = [];
            incompCounter = 0;

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
          }
          break;
      }
    }

    setNumIncomplete(incompCounter);
    setTasks(tasksCopy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, request, isLoading]);

  return (
    <div id="main-content">
      <Route path="/" exact>
        <ToDoForm onChange={handleChange} onSubmit={handleSubmit} />
      </Route>
      <Route path="/tasks" exact>
        <ToDoList
          numIncomplete={numIncomplete}
          isLoading={isLoading && request.method === 'GET'}
          error={error}
          tasks={tasks}
          editTask={editTask}
          deleteTask={deleteTask}
        />
      </Route>
    </div>
  );
}

export default ToDo;
