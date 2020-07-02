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
   * currently, the setNumIncomplete and setTasks are necessary for testing but not
   * in the actual app since there is a hook that does GET fetch after this function
   */
  function addTask() {
    async function postHelper() {
      const requestBody = {
        method: 'POST',
        body: data,
      };

      await setUrl(baseUrl);
      await setRequest(requestBody);
    }

    postHelper();
    setIncompleteAndTasks(data.complete ? numIncomplete : numIncomplete + 1, [
      ...tasks,
      data,
    ]);
    setData(baseData);
    getTasks();
  }

  function resultsCounter(results) {
    let tasksCopy = [...tasks];
    let incompCounter = numIncomplete;

    if (results) {
      tasksCopy = [];
      incompCounter = 0;

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
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

    setIncompleteAndTasks(incompCounter, tasksCopy);
  }

  function setIncompleteAndTasks(newIncomp, newTasks) {
    setNumIncomplete(newIncomp);
    setTasks(newTasks);
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

    const filteredArr = tasks.filter((_task, index) => index !== deleteIndex);

    setIncompleteAndTasks(
      taskToDelete.complete ? numIncomplete : numIncomplete,
      filteredArr
    );
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
    if (response && response.results && !isLoading) {
      resultsCounter(response.results);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, isLoading]);

  return (
    <div id="main-content">
      <Route path="/" exact>
        <ToDoForm onChange={handleChange} onSubmit={handleSubmit} />
      </Route>
      <Route path="/tasks" exact>
        <ToDoList
          numIncomplete={numIncomplete}
          isLoading={isLoading && request && request.method === 'GET'}
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
