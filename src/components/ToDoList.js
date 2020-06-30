import React from 'react';
import TodoItem from './ToDoItem';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import If from './If';
import LoadingSpinner from './LoadingSpinner';

/**
 * component holding a list of ToDo items and some supplementary text elements
 * used as a child component of the ToDo component
 *
 * @component
 * @example
 * return (
 *   <TodoList
 *     tasks=[
 *        {
 *          text: 'cook green eggs and ham'
 *          assignee: 'Sam I Am',
 *          difficulty: 3,
 *          completed: false,
 *        },
 *        {
 *          text: 'take a shower',
 *          assignee: 'Bob Saget',
 *          difficulty: 1,
 *          completed: true,
 *        }
 *      ]
    />
 * )
 */
function ToDoList(props) {
  const tasksToRender = [];

  if (props.tasks) {
    for (let i = 0; i < props.tasks.length; i++) {
      const currTask = props.tasks[i];

      tasksToRender.push(
        <TodoItem
          key={Math.random(i * 1000) + currTask}
          task={currTask}
          index={i}
          editTask={props.editTask}
          deleteTask={props.deleteTask}
        />
      );
    }
  }

  return (
    <If condition={props.tasks}>
      <h2 className="mb-4">Tasks ToDo</h2>
      <div className="mt-4 mb-4">
        {props.isLoading ? (
          <LoadingSpinner />
        ) : tasksToRender.length ? (
          <div className="mt-4 mb-4">{tasksToRender}</div>
        ) : (
          <div className="no-tasks m-4">
            <img
              src={require('../assets/empty-notebook.jpg')}
              alt="empty notebook"
            />
            <p className="mt-4 mb-4 center">
              No tasks to show! Please return to the home page to add a task to
              the todo list.
            </p>
            <Link to="/" className="no-underline m-4">
              <Button variant="info" className="btn-lg btn-block">
                Return to Form Page
              </Button>
            </Link>
          </div>
        )}
      </div>
    </If>
  );
}

export default ToDoList;
