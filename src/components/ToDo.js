import React, { useEffect, useState } from 'react';
import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';
import { Route } from 'react-router-dom';
import '../styles/todo.scss';
import useFetch from '../hooks/useFetch';
import useForm from '../hooks/useForm';
import { ListContext, CrudContext } from './Contexts';

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
  const [displayCount, setDisplayCount] = useState(3);
  const [pageIndex, setPageIndex] = useState(0);
  const [onLastPage, setOnLastPage] = useState(false);
  const [showCompleted, setShowCompleted] = useState(true);

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

  const {
    setUrl,
    setRequest,
    setFetchTrigger,
    request,
    isLoading,
    error,
    response,
  } = useFetch(baseUrl, baseReq, true);

  const { handleSubmit, handleChange, data, setData } = useForm(
    addTask,
    baseData
  );

  /**
   * function that adds a task to the ToDo list
   * makes a POST API fetch
   * currently, the setIncompleteAndTasks is necessary for testing but not
   * in the actual app since runGet in the requestBody does a follow-up GET fetch
   */
  function addTask() {
    const requestBody = {
      method: 'POST',
      body: data,
      runGet: true,
    };

    fetchHelper(baseUrl, requestBody);
    setIncompleteAndTasks(data.complete ? numIncomplete : numIncomplete + 1, [
      ...tasks,
      data,
    ]);
    setData(baseData);
    setPageIndex(0);
    setShowCompleted(true);
  }

  /**
   * helper function that sets up the useFetch hook with the appropriate parameters and enables
   * a fetch by setting the fetch trigger to true
   * @param {String} url - url to be used for the API fetch
   * @param {Object} reqBody - request body to be used for the API fetch
   */
  function fetchHelper(url, reqBody) {
    setUrl(url);
    setRequest(reqBody);
    setFetchTrigger(true);
  }

  /**
   * simple function that performs a GET fetch to grab all ToDo tasks
   * used in conjunction with the componentDidMount-like useEffect hook to re-render on a timer
   */
  function getTasks() {
    fetchHelper(baseUrl, baseReq);
  }

  /**
   * helper function that edits an existing task
   * makes a PUT API fetch
   * currently only toggling checkbox complete status
   * @param {Number} index - index of the task object in the tasks array to edit (only used
   * when all tasks are displayed)
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

    fetchHelper(baseUrl + `/${updatedTask.id}`, requestBody);

    const tasksCopy = [...tasks];

    if (showCompleted) {
      tasksCopy[index] = updatedTask;
    } else {
      for (let i = 0; i < tasksCopy.length; i++) {
        const task = tasksCopy[i];
        if (task.id === updatedTask.id) {
          tasksCopy[i] = updatedTask;
          break;
        }
      }
    }

    setIncompleteAndTasks(
      updatedTask.complete ? numIncomplete - 1 : numIncomplete + 1,
      tasksCopy
    );
  }

  /**
   * function that deletes an existing task
   * makes a DELETE API fetch
   * @param {Number} deleteIndex - index of the task object to delete (only used
   * when all tasks are displayed or testing doesn't give an id)
   * @param {Object} taskToDelete - object of the task to delete
   */
  function deleteTask(deleteIndex, taskToDelete) {
    const requestBody = {
      method: 'DELETE',
    };

    fetchHelper(baseUrl + `/${taskToDelete.id}`, requestBody);

    const filteredArr = tasks.filter((task, index) =>
      task.id ? task.id !== taskToDelete.id : index !== deleteIndex
    );

    setIncompleteAndTasks(
      taskToDelete.complete ? numIncomplete : numIncomplete,
      filteredArr
    );
  }

  /**
   * helper function that iterates through an array and updates the state for numIncomplete
   * and tasks
   * @param {Array} results - array of tasks to iterate through
   */
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

  /**
   * helper function that sets the number of incomplete items and tasks
   * @param {Number} newIncomp - new value for numIncomplete number
   * @param {Array} newTasks - new value for tasks array
   */
  function setIncompleteAndTasks(newIncomp, newTasks) {
    setNumIncomplete(newIncomp);
    setTasks(newTasks);
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

    return () => {
      document.title = 'This component is dead, Jim!';
    };
  }, [numIncomplete]);

  /**
   * hook that re-counts the number of incomplete tasks whenever a GET fetch occurs
   * cut down from a previuosly overly bloated hook
   */
  useEffect(() => {
    if (response && response.results && !isLoading) {
      resultsCounter(response.results);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, isLoading]);

  return (
    <div id="main-content">
      <ListContext.Provider
        value={{
          results: tasks,
          displayCount,
          setDisplayCount,
          pageIndex,
          setPageIndex,
          onLastPage,
          setOnLastPage,
          showCompleted,
          setShowCompleted,
        }}
      >
        <CrudContext.Provider value={{ editTask, deleteTask }}>
          <Route path="/" exact>
            <ToDoForm onChange={handleChange} onSubmit={handleSubmit} />
          </Route>
          <Route path="/tasks" exact>
            <ToDoList
              numIncomplete={numIncomplete}
              isLoading={isLoading && request && request.method === 'GET'}
              error={error}
            />
          </Route>
        </CrudContext.Provider>
      </ListContext.Provider>
    </div>
  );
}

export default ToDo;
