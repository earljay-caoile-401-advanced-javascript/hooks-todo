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

  const { handleSubmit, handleChange, data } = useForm(baseData, addTask);

  function addTask() {
    const newTask = data;
    const requestBody = {
      method: 'POST',
      body: newTask,
    };

    setUrl(baseUrl);
    setRequest(requestBody);
    setNumIncomplete(newTask.complete ? numIncomplete : numIncomplete + 1);
    setTasks([...tasks, newTask]);
  }

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

  function deleteTask(deleteIndex) {
    // console.log('Are we in deleteTask?', deleteIndex);
    const taskToDelete = tasks[deleteIndex];

    const requestBody = {
      method: 'DELETE',
    };

    setUrl(baseUrl + `/${taskToDelete.id}`);
    setRequest(requestBody);

    if (!taskToDelete.complete) {
      setNumIncomplete(numIncomplete - 1);
    }

    const filteredArr = tasks.filter((task, index) => index !== deleteIndex);
    // console.log('what is filteredArr?', filteredArr);
    setTasks(filteredArr);
  }

  useEffect(() => {
    document.title = `ToDo: ${numIncomplete} ${
      numIncomplete === 1 ? 'task' : 'tasks'
    } incomplete`;
  }, [numIncomplete]);

  useEffect(() => {
    // console.log('What is response?', response);
    if (response && response.results) {
      const tasksCopy = [];
      let incompCounter = 0;
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
  }, [response]);

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
